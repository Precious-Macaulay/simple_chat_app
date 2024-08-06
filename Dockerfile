# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file and install the dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port that the WSGI server will run on
EXPOSE 8881

# Command to run the application with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8881", "app:app"]