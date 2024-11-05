import random
from datetime import datetime, timedelta


def generate_random_dates(start_date, end_date, num_dates):
    start_timestamp = datetime.timestamp(start_date)
    end_timestamp = datetime.timestamp(end_date)

    random_dates = []
    for _ in range(num_dates):
        random_timestamp = random.uniform(start_timestamp, end_timestamp)
        random_date = datetime.fromtimestamp(random_timestamp)
        random_dates.append(random_date)

    return random_dates


# Define the start and end dates
start_date = datetime(2022, 11, 4)
end_date = datetime(2024, 11, 4)

# Generate five random dates

# Print the random dates


def get_random_dates(max_dates=5):
    random_dates = generate_random_dates(start_date, end_date, max_dates)
    sorted_dates = sorted(random_dates)  # Sort the dates
    return sorted_dates
