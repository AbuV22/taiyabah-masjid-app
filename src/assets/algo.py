import PyPDF2
import re
import json
from datetime import datetime

def extract_prayer_times_from_pdf(pdf_path):
    # Open the PDF file
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()

    # Define patterns to extract necessary data
    date_pattern = r'(\d{2} [A-Za-z]+ \d{4})'  # Date like 01 December 2024
    day_pattern = r'([A-Za-z]+day)'  # Day like Sunday, Monday
    hijri_pattern = r'(\d+ [A-Za-z]+)'  # Hijri Date like 29 J. Awl

    # Patterns for prayer times
    beginning_times_pattern = r'Fajr\s*([\d:]+).*?Sunrise\s*([\d:]+).*?Zuhr\s*([\d:]+).*?Asr\s*([\d:]+).*?Maghrib\s*([\d:]+).*?Isha\s*([\d:]+)'
    jamat_times_pattern = r'Jamat Fajr\s*([\d:]+).*?Jamat Zuhr\s*([\d:]+).*?Jamat Asr\s*([\d:]+).*?Jamat Maghrib\s*([\d:]+).*?Jamat Isha\s*([\d:]+)'

    # Find all relevant information
    dates = re.findall(date_pattern, text)
    days = re.findall(day_pattern, text)
    hijri_dates = re.findall(hijri_pattern, text)
    beginning_times = re.findall(beginning_times_pattern, text, re.DOTALL)
    jamat_times = re.findall(jamat_times_pattern, text, re.DOTALL)

    # Now, format this information into the required structure
    prayer_schedule = {}

    for idx, date in enumerate(dates):
        date_obj = datetime.strptime(date, "%d %B %Y")
        month = date_obj.strftime("%B_%Y")
        
        if month not in prayer_schedule:
            prayer_schedule[month] = []
        
        # Create entry for each date with prayer times
        prayer_schedule[month].append({
            "date": date,
            "day": days[idx],
            "hijri_date": hijri_dates[idx],
            "beginning_times": {
                "fajr": beginning_times[idx][0],
                "sunrise": beginning_times[idx][1],
                "zuhr": beginning_times[idx][2],
                "asr": beginning_times[idx][3],
                "maghrib": beginning_times[idx][4],
                "isha": beginning_times[idx][5]
            },
            "jamat_times": {
                "fajr": jamat_times[idx][0],
                "zuhr": jamat_times[idx][0],  # Assuming Jamat times for Zuhr follow the same pattern
                "asr": jamat_times[idx][1],
                "maghrib": jamat_times[idx][2],
                "isha": jamat_times[idx][3]
            }
        })
    
    return prayer_schedule


def main():
    pdf_path = "your_pdf_file.pdf"  # Path to your PDF file
    prayer_schedule = extract_prayer_times_from_pdf(pdf_path)
    
    # Print the result as a JSON string
    print(json.dumps(prayer_schedule, indent=4))


if __name__ == "__main__":
    main()
