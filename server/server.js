let base_url;
let api_key;

exports = {
  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.

  onTicketCreateCallback: function (args) {
    // console.log(args?.data?.ticket?.tweet_id, "----->tweet id");
    // console.log(args?.iparams);
    base_url = `https://${args?.iparams?.domain_url}/api/v2`;
    api_key = args?.iparams?.api_key;
    updateTweetID(args);
  },
};

//Update contact field
const updateTweetID = async (args) => {
  let contact_id = args?.data?.ticket?.requester_id;
  let tweet_id = args?.data?.ticket?.tweet_id;
  let url = `${base_url}/contacts/${contact_id}`;
  let options = {
    headers: {
      Authorization: `Basic <%= encode(iparam.api_key) %>`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ twitter_id: tweet_id.toString() }),
  };
  console.log(options, "---->options");
  console.log(url, "---->url");
  try {
    let data = await $request.put(url, options);
    console.log(data, "------->data");
  } catch (error) {
    console.error(error);
  }
};
