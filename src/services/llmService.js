const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * LLM Service to interact with Google Gemini API
 */
class LLMService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.error('CRITICAL: GEMINI_API_KEY is missing from .env');
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        this.modelName = 'gemini-flash-latest';
    }

    /**
     * Summarizes the given text using Gemini
     * @param {string} text - The input text to summarize
     * @returns {Promise<Object>} - The summary and model name used
     */
    async summarize(text) {
        try {
            const model = this.genAI.getGenerativeModel({ model: this.modelName });

            const prompt = `Summarize the following text into 3-6 concise bullet points. 
      Text: "${text}"`;

            console.log(`\n--- Gemini Request (${this.modelName}) ---`);
            console.log('Prompt:', prompt);

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const summary = response.text();

            console.log('\n--- Gemini Response ---');
            console.log('Summary:', summary);
            console.log('------------------------\n');

            return {
                summary,
                model: this.modelName
            };
        } catch (error) {
            console.error('LLM Service Error:', error.message);
            throw new Error('Failed to communicate with LLM provider');
        }
    }
}

module.exports = new LLMService();
