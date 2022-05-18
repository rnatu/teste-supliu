import axios from 'axios';

async function loadApiData() {
  const { data: apiResponse } = await axios.get(
    'https://tiao.supliu.com.br/api/album',
    {
      headers: {
        Authorization: 'rnatu91@gmail.com',
      },
    },
  );
  return apiResponse.data;
}

export default loadApiData;
