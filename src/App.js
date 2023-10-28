import React, { useState } from 'react';
import './App.css';

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [backgroundImage, setBackgroundImage] = useState('url(' + require('./images/padraoimg.jpg') + ')');

  const [cidade, setcidade] = useState("");
  const [previsao, setprevisao] = useState(null);
  const [msg, setmsg] = useState(null);

  const dataAtual = new Date();
  const dataHora = dataAtual.getHours()
  const dataMinutos = dataAtual.getMinutes()

  const opcoesFormatacao = { day: 'numeric', month: '2-digit', year: 'numeric' };
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesFormatacao);

  const handlechange = (e) => {
    setcidade(e.target.value);
    console.log({ cidade });
  }
  const handlesearch = () => {
    console.log("cidade é:" + cidade);

    if ({ cidade } != null && { cidade } != undefined && { cidade } != []) {
      fetch(`${api.base}weather?q=${cidade}&lang=pt_br&units=metric&APPID=${api.key}&lang=pt`)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        }).then((data) => {
          console.log('data ==>', data);
          setprevisao(data);
          PegarCor(data.main.temp);
          setmsg(null);
        }
        ).catch((error) => {
          console.log(error)
          setmsg("Digite uma cidade válida")
        })
    }
  }
  const changeBackgroundImage = (temperatura) => {
    // Troque a imagem de fundo para a segunda imagem (por exemplo, imagem2.jpg)
    if (temperatura === 'calor') {
      setBackgroundImage('url(' + require('./images/calor.png') + ')');
    }
    if (temperatura === 'frio') {
      setBackgroundImage('url(' + require('./images/frio.jpg') + ')');
    }
  };

  function PegarCor(temp) {
    console.log(temp);
    if (temp > 15) {
      changeBackgroundImage('calor')
    } else if (temp < 15) {
      changeBackgroundImage('frio')
    }
  }


  return (
    <div className='principal text-white'>
      <div className='text-center bg-dark text-white App-header'>
        <h1 style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Clima - Cidades</h1>
      </div>

      <div className='principal bg-image' style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', height: '100vh' }}>
        <div className='container' style={{ alignItems: 'center', }}>
          <div className=' text-center'>
            <div className='row' style={{ justifyContent: 'center' }}>
              <div className='col-md-5 mb-2'>
                <input onChange={handlechange} className='form-control' placeholder='Digite a sua cidade' value={cidade}></input>
              </div>



              {msg ? (
                <div className='msgerr' style={{ fontSize:'15px',color:'orange', fontFamily:'cursive',fontWeight:'bold'}}>
                  <p>{msg}</p>
                </div>
              ) : null}




              <div className='col-md-1 botaobuscar'>
                <button onClick={handlesearch} className='btn btn-primary'>Pesquisar</button>
              </div>
            </div>
            {previsao ? (

              <div className='previsao' style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div className='cidadepais' style={{ marginTop: '20px' }}>
                  <h4>{previsao.name}, {previsao.sys.country}</h4>
                </div>
                <div className='datahora' style={{ marginTop: '20px', fontFamily: 'cursive', fontSize: '20px', fontWeight: 'bold' }}>
                  <p>{dataFormatada} - {dataHora}:{dataMinutos}</p>
                </div>
                <div className='temperaturaC'>
                  <p className='tempP'>{previsao.main.temp}°C</p>
                </div>
                <div className=''>
                  <p className='descricao'>{previsao.weather[0].description}</p>
                </div>
                <div>
                  <img className=' App-logo App-logo-spin' src={`http://openweathermap.org/img/w/${previsao.weather[0].icon}.png`} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
