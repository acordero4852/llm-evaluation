'use server';

export async function generateResponse(text: string) {
  try {
    const response = await fetch(
      'http://localhost:3000/api/grenerate-response',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', errorText);
      throw new Error(`HTTP Error! (Status: ${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to generate image',
    };
  }
}
