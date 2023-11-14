document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();
  async function renderApp() {
    try {
      let client = await app.initialized();
      window.client = client;
    } catch (error) {
      return console.error(error);
    }
  }
};

const apiKey = document.querySelector(".secure-field");
const domain = document.querySelector(".domain");

function getConfigs(configs) {
  //write your code here
  let { api_key, domain_url } = configs;
  apiKey.value = api_key;
  domain.value = domain_url;
}

async function validate() {
  const URL = `https://${domain.value}/api/v2/tickets`;
  const base64Encoded = btoa(apiKey.value);
  let options = {
    headers: {
      Authorization: `Basic ${base64Encoded}`,
      "Content-Type": "application/json",
    },
  };
  try {
    let { status } = await client.request.get(URL, options);
    if (status == 200) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function postConfigs() {
  //write your code here
  return {
    __meta: {
      secure: ["apiKey"],
    },
    api_key: apiKey.value,
    domain_url: domain.value,
  };
}
