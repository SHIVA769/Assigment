const llmService = require('../services/llmService');

exports.summarizeText = async (req, res) => {
    const { text } = req.body;

    // Basic Input Validation
    if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({ message: 'Text is missing or empty' });
    }

    // Minimum length check
    if (text.length < 50) {
        return res.status(400).json({ message: 'Text is too short (minimum 50 characters required)' });
    }

    // Maximum length check (8,000 characters)
    if (text.length > 8000) {
        return res.status(413).json({ message: 'Text is too large (maximum 8,000 characters allowed)' });
    }

    try {
        const { summary, model } = await llmService.summarize(text);

        res.status(200).json({
            summary: summary.trim(),
            model
        });
    } catch (error) {
        console.error('Summarize Controller Error:', error);
        res.status(502).json({ message: 'Error from LLM provider: ' + error.message });
    }
};
