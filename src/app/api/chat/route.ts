import { mistral } from '@ai-sdk/mistral';
import { convertToModelMessages, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: mistral('mistral-small-latest'),
    system:
      'Tu es un assistant sur le site portfolio de Quentin Truffy, développeur logiciel. Réponds de manière concise et amicale. Tu peux répondre en français ou en anglais selon la langue de la question.',
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
