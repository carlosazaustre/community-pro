// Route: /api/swagger

import { NextResponse } from 'next/server';
import swaggerSpec from '@/shared/lib/swagger';

/**
 * @openapi
 * /api/swagger:
 *   get:
 *     summary: Retrieve Swagger Specification
 *     description: Returns the Swagger specification for the API.
 *     responses:
 *       200:
 *         description: Successfully retrieved Swagger specification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: The Swagger specification object.
 */
export async function GET() {
  return NextResponse.json(swaggerSpec);
}
