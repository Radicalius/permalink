FROM python:3

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt; mkdir pages
COPY srv.py srv.py

VOLUME pages
EXPOSE 8000

CMD python srv.py
