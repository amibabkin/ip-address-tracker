export async function getAddress(ip = "8.8.8.8") {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_dF03nWZXek7E3CgKtHheGrsLQcsop&ipAddress=${ip}`
  );

  return await response.json();
}
