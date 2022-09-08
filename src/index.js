import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addTileLayer, validateIp, getAddress, addOffset } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

const ipInfo = document.getElementById("ip");
const locationInfo = document.getElementById("location");
const timezoneInfo = document.getElementById("timezone");
const ispInfo = document.getElementById("isp");

// MAP
const mapArea = document.querySelector(".map");
const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});
const map = L.map(mapArea, {
  center: [51.5, -0.09],
  zoom: 13,
});
addTileLayer(map);
L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + " " + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("8.8.8.8").then(setInfo);
});
