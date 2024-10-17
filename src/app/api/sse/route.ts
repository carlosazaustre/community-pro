export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

/**
 * @openapi
 * /api/sse:
 *   get:
 *     summary: Establishes a Server-Sent Events (SSE) connection.
 *     description: |
 *       This endpoint establishes a Server-Sent Events (SSE) connection that streams events to the client.
 *       The client must provide a `conversationId` as a query parameter to identify the connection.
 *     parameters:
 *       - in: query
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to establish the SSE connection for.
 *     responses:
 *       200:
 *         description: SSE connection established successfully.
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: |
 *                 data: ping
 *
 *       400:
 *         description: Bad request. The `conversationId` query parameter is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: conversationId is required
 *     x-codeSamples:
 *       - lang: JavaScript
 *         label: JavaScript Fetch
 *         source: |
 *           fetch('/api/sse?conversationId=12345', {
 *             headers: {
 *               'Accept': 'text/event-stream',
 *             },
 *           }).then(response => {
 *             const reader = response.body.getReader();
 *             reader.read().then(function processText({ done, value }) {
 *               if (done) return;
 *               console.log(new TextDecoder().decode(value));
 *               reader.read().then(processText);
 *             });
 *           });
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return NextResponse.json({ error: 'conversationId is required' }, { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      // Keep the connection alive
      const interval = setInterval(() => {
        sendEvent('ping');
      }, 15000);

      // Store the connection
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const connections = ((global as any).connections = (global as any).connections || {});
      connections[conversationId] = connections[conversationId] || [];
      connections[conversationId].push(sendEvent);

      // Clean up on close
      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        const index = connections[conversationId].indexOf(sendEvent);
        if (index > -1) {
          connections[conversationId].splice(index, 1);
        }
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
