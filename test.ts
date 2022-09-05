import axios from "axios";

const headers = {
  "Authorization": "Basic S0FTS044MzVKTTNGMkFNRDBaTkdKMEgzOjZnR0lybmE2aGZ1bXFtc0RfMktYZnBCVFFpY1F4a1hUM1Zkb1FIREE=",
  "x-chain-id": "8217",
  "Content-Type": "application/json",
}

const main = async () => {
  try {
    const result = await axios.delete("https://kip17-api.klaytnapi.com/v2/contract/0xafb0f45516939eac1c9bd742d94d4293788d32ae/token/0x5c84124e41", {
      headers,
      data: {
        from: "0x517421CD2eb67ACC70dEEfF7506975c3366afF1a"
      }
    })
    console.log('result', result)
  } catch (err) {
    console.log('err', err)
  }
}

main()