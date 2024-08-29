#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <TinyGPS++.h>

const char* ssid     = "Freebox-1E5E21";
const char* password = "derogavi2-aqueos#-currente7.-precemur5?";

const char* serverName = "http://192.168.1.200:8000/gps/gps/";

WiFiClient client;
HTTPClient http;
TinyGPSPlus gps;

// Configuration de la broche RX pour le GPS. La broche TX n'est pas utilisée dans ce cas.
static const int GPSRXPin = 16; // GPS TX est connecté à la broche RX de l'ESP32
static const uint32_t GPSBaud = 9600;

// L'ESP32 se connecte au port série du GPS
HardwareSerial SerialGPS(1);

void setup() {
  // Initialisation du port de communication avec le GPS
  SerialGPS.begin(GPSBaud, SERIAL_8N1, GPSRXPin, -1); // Pas de TX Pin utilisé ici
  
  // Initilisation de la communication série pour afficher les données du GPS
  Serial.begin(115200);
  delay(10);
  
  // Connexion au WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());
}

void loop() {
  while (SerialGPS.available() > 0) {
    if (gps.encode(SerialGPS.read())) {
      if (gps.location.isUpdated()) {
        // Prépare le document JSON
        StaticJsonDocument<200> jsonDoc;
        jsonDoc["latitude"] = gps.location.lat();
        jsonDoc["longitude"] = gps.location.lng();
        jsonDoc["personneSuivi_id"] = "1"; // Remplacer avec l'ID approprié
        String jsonString;
        serializeJson(jsonDoc, jsonString);

        // Envoi du JSON au serveur
        http.begin(client, serverName);
        http.addHeader("Content-Type", "application/json");
        int httpResponseCode = http.POST(jsonString);

        if (httpResponseCode > 0) {
          String response = http.getString();
          Serial.println(httpResponseCode);
          Serial.println(response);
        } else {
          Serial.print("Error on sending POST: ");
          Serial.println(httpResponseCode);
        }
        
        // Fin de la requête
        http.end();
      }
    }
  }
  
  // Envoi des données toutes les 5 secondes par exemple
  delay(5000);
}