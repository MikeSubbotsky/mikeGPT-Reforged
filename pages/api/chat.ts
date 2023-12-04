import type { NextApiRequest, NextApiResponse } from 'next';
import { addMessage, createAndRunThread, createRun, retrieveMessages, retrieveRunStatus } from '../../src/utils/openai';

type OpenAIMessage = {
  content: Array<{
    text?: {
      value: string;
    };
  }>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { message, threadId } = req.body;
      let newThreadId: string | undefined;
      let runId: string;

      if (!threadId) {
        const run = await createAndRunThread(message);
        newThreadId = run.thread_id;
        runId = run.id;
      } else {
        await addMessage(threadId, message);
        const run = await createRun(threadId);
        runId = run.id;
      }

      let runStatus = await retrieveRunStatus(newThreadId || threadId, runId);

      // Poll for completion status
      let elapsedTime = 0;
      let delay = 500; // Initial delay in milliseconds

      while (runStatus.status !== 'completed' && elapsedTime < 30000) {
        await new Promise(resolve => setTimeout(resolve, delay));
        elapsedTime += delay;
        runStatus = await retrieveRunStatus(newThreadId || threadId, runId);

        // Adjust delay based on elapsed time
        if (elapsedTime >= 5000 && elapsedTime < 15000) {
          delay = 2000;
        } else if (elapsedTime >= 15000) {
          delay = 5000;
        }
      }

      if (runStatus.status !== 'completed') {
        throw new Error('Run did not complete in time');
      }

      const messages = await retrieveMessages(newThreadId || threadId) as OpenAIMessage[];
      const assistantMessage = messages[0]?.content[0]?.text?.value || 'No response';
      res.status(200).json({ assistantMessage, newThreadId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing your request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

