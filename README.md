# RetinaAI
This repository includes the application I built for my final university project as part of an academic research initiative focused on applying artificial intelligence to biomedical data. The main goal was to classify the stage of retinal degeneration in genetically modified mice using laboratory data. For that, I had to experiment with different machine learning and deep learning models, test various data preprocessing methods, and tune hyperparameters to see how performance changed.

In addition to the predictive model, the project includes a structured database and a simple web application that integrates the AI model for experimentation.

## Project Overview
The project was primarily experimental, focusing on the application of Artificial Intelligence to a binary classification problem. Both machine learning and deep learning models were explored and implemented. The data used consisted of measurements obtained from laboratory experiments, and after analyzing these data, two classifiers were designed and developed. 
The approach for applying the models was:
1. **Data Collection & Preprocessing**
The data was organized into a structured dataset; for that, several preprocessing steps were carried out:
- Cleaning
- Editing variables
- Deleting instances and variables
- Feature Scaling
- categorization and encoding
2. **Model experimentation**
Different Machine Learning (XGBoost, SVM, Random Forest, Naive Bayes, and Logistic Regression) and Deep Learning models (DNN, MLP) were tested and compared.
I experimented:
- Data scaling
- Hyperparameter tuning
- Architecture adjustments 
- Data augmentation

All documentation and experimental code notebooks are included in the `Exp_ML_DL` folder.
## Database
A **SQL database** was designed to store mice's experimental data from lab experiments.  
A database creation script is provided (`insert_animales_mysql_updated.sql`) to set up the schema and initial data.
## Web Application
This web application was developed to test the model and display its predictions in an accessible way. It consists of:
- **Backend (Python)**: Flask-based server that loads the model and handles API requests.  
- **Frontend (JavaScript)**: Client that sends data to the backend and displays prediction results.
## How to Run the Project 
1. Install all the dependencies:
   Run pip install -r requirements.txt
3. Create the SQL database using the provided script:
  You may need to update the database user and password in the code to match your local configuration.
4. Run the application:
  python app.py
5. The interface will be available in:
   http://127.0.0.1:5000/
