import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create and run a thread with the assistant
async function createAndRunThread(message: string) {
  const assistantId = process.env.OPENAI_ASSISTANT_ID!;
  const run = await openai.beta.threads.createAndRun({
    assistant_id: assistantId,
    thread: { messages: [{ role: 'user', content: message }] },
  });
  return run;
}

// Create a run with an existing thread
async function createRun(threadId: string) {
  const assistantId = process.env.OPENAI_ASSISTANT_ID!;
  const run = await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId });
  return run;
}

// Add a message to a thread
async function addMessage(threadId: string, messageContent: string) {
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: messageContent,
  });
  console.log('Message added');
}

// Retrieve messages from a thread
async function retrieveMessages(threadId: string) {
  const messages = await openai.beta.threads.messages.list(threadId);
  messages.data.forEach((message, index) => {
    console.log(`Message ${index + 1} content:`, message.content);
  });
  return messages.data;
}

// Retrieve run status
async function retrieveRunStatus(threadId: string, runId: string) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    return runStatus;
  }

export { createAndRunThread, createRun, addMessage, retrieveMessages, retrieveRunStatus };



  

