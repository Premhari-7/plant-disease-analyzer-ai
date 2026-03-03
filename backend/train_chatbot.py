import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load disease knowledge
with open("chatbot_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Prepare training data
X = []   # user sentences
y = []   # disease labels

for disease in data:
    X.append(disease)
    y.append(disease)

# Convert text to numbers
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# Train ML model
model = LogisticRegression()
model.fit(X_vec, y)

# Save trained files
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))
pickle.dump(model, open("labels.pkl", "wb"))

print("✅ Chatbot trained successfully")
