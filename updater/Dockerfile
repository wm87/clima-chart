FROM python:3.13

WORKDIR /app

COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x update.sh

RUN apt-get update && apt-get install -y cron

RUN echo "*/1 * * * * root /bin/bash /app/update.sh >> /app/logs/update.log 2>&1" > /etc/cron.d/update
#RUN echo "0 3 * * * root /bin/bash /app/update.sh >> /app/logs/update.log 2>&1" > /etc/cron.d/update
RUN chmod 0644 /etc/cron.d/update
RUN crontab /etc/cron.d/update

RUN touch /var/log/cron.log

CMD ["cron", "-f"]
