# RetinaAI
This repository includes the application I built for my final university project as part of an academic research initiative focused on applying artificial intelligence to biomedical data. The main goal was to classify the stage of retinal degeneration in genetically modified mice using laboratory data. For that, I had to experiment with different machine learning and deep learning models, test various data preprocessing methods, and tune hyperparameters to see how performance changed.

In addition to the predictive model, the project includes a structured database and a simple web application that integrates the AI model for experimentation.

## Project Overview
The study explores the use of machine learning and deep learning models to analyze biological data obtained from experimental mice.  
By processing these datasets, the goal is to predict whether the retina will degenerate or remain healthy, based on the input parameters collected in the lab.

The project is divided into three main components:
1. **Machine Learning Model**: Responsible for training and classification.
2. **SQL Database**: Stores the data collected from genetically modified mice.
3. **Web Application**: Provides an interface to interact with the model and view predictions.

## Approach for Applying the Model
1. **Data Collection & Preprocessing**
The data came from laboratory experiments with mice and was organized into a structured dataset.
Several preprocessing steps were carried out: cleaning, editing variables, and preparing a SQL database to efficiently manage the information.
2. **Model experimentation**
Different machine learning and deep learning models were tested and compared.
I experimented with data scaling, hyperparameter tuning, architecture adjustments, and data augmentation.
Since the dataset was relatively small, the focus was on understanding model behavior rather than achieving perfect accuracy.
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
