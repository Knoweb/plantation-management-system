from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
# Enable CORS for frontend (5173) and other services
CORS(app)

@app.route('/api/v1/ai/insights', methods=['GET'])
def get_insights():
    """
    Returns simulated AI insights about harvest and muster data.
    In a real scenario, this would import `pandas` and query the DB.
    """
    
    # Simulated Insights
    insights = [
        {
            "id": "1",
            "type": "HARVEST",
            "severity": "WARNING",
            "message": "Harvest efficiency in Field F-002 dropped 12% compared to last week.",
            "action": "Check for pest issues or weather impact."
        },
        {
            "id": "2",
            "type": "MUSTER",
            "severity": "INFO",
            "message": "Attendance is 98% today. Highest turnout this month!",
            "action": "Good day for heavy plucking."
        },
        {
            "id": "3",
            "type": "WEATHER",
            "severity": "CRITICAL",
            "message": "Heavy rain predicted for tomorrow afternoon.",
            "action": "Schedule morning shifts only."
        }
    ]
    
    # Randomly select 1 or 2 insights to keep it dynamic
    selected_insights = random.sample(insights, k=random.randint(1, 3))
    
    return jsonify({
        "status": "success",
        "data": selected_insights
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "ai-service"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
