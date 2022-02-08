from matplotlib.style import available
import requests
import time
import random
from threading import Thread


BASE_URL = "http://localhost:3001/"
BUS_MAXIMUN_CAPACITY = 30


"""
    Thread to executed multi bus tasks.
"""
class Threads(Thread):

    bus_dict: dict  # Store a dict related to the information of a Bus.

    def __init__(self, bus_info) -> None:
        Thread.__init__(self)
        self.bus_dict = bus_info
    
    def generate_random_passenger_number(self) -> int:
        """
            Method to calculate the number of people on the bus according to 
            the one's that are leaving and the one's that are getting them selves in.
        """
        people_leaving = random.randint(0, self.bus_dict["passengers_number"]+1)
        available_possitions = BUS_MAXIMUN_CAPACITY - self.bus_dict["passengers_number"] - people_leaving
        if available_possitions < 0:
            available_possitions = 1
        people_on_bus = random.randint(0, available_possitions)
        return people_on_bus
    
    def run(self) -> None:
        last_time = time.time()
        while True:
            current_time = time.time()
            if current_time - last_time > self.bus_dict["random_time"]:
                if self.bus_dict["in_a_bus_stop"]:
                    """
                        Check if this is a Bus Stop tho determinated the number of
                        passengers on the bus.
                    """
                    passenger_number = self.generate_random_passenger_number()
                    data = { 
                        "id_bus":self.bus_dict["id"], 
                        "passengers_number": passenger_number
                    }
                    update_passenger_nr = requests.post(f"{BASE_URL}bus/update_passenger_number", data)
                    if update_passenger_nr.status_code == 200:
                        id, plate = self.bus_dict["id"], self.bus_dict["registration_plate"]
                        print(f"Id: {id}, Plate: {plate}, Passenger Number: {passenger_number}, Status: Updated")
                
                id, plate = self.bus_dict["id"], self.bus_dict["registration_plate"]
                data = { "bus_id": self.bus_dict["id"], "id_route": self.bus_dict["id_route"] }
                update_response = requests.post(f"{BASE_URL}bus/update_a_bus_position", data)
                
                if update_response.status_code == 200:
                    print(f"Id: {id}, Plate: {plate}, Possition: Updated")
                    bus_id, random_time = self.bus_dict["id"], random.randint(5, 40)
                    self.bus_dict = requests.get(f"{BASE_URL}bus/get_a_busInfo/{bus_id}")
                    self.bus_dict = self.bus_dict.json()
                    self.bus_dict["random_time"] = random_time

                last_time = current_time

update_response = requests.post(f"{BASE_URL}bus/update_all_bus_position", {})
all_bus_info = requests.get(f"{BASE_URL}bus")

all_bus_dict = all_bus_info.json()

# Atributing a random time for the bus move from one coordinates to other one
thread_list = []
for bus_info in all_bus_dict["bus"]:
    """
        Making the Thread objects.
    """
    bus_info["random_time"] = random.randint(5, 30)
    th = Threads(bus_info) 
    thread_list.append(th)
    
for th in thread_list:  
    """
        Starting threads.
    """  
    th.start()
