import { useEffect, useState } from 'react';
import './App.css';

const baseLink = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json";

function App() {
  const [lula, setLula] = useState(null)
  const [votosValidos, setVotosValidos] = useState(0)
  const [votosValidosPct, setVotosValidosPct] = useState(0)

  const [totalApuradoPct, setTotalApuradoPct] = useState(0)

  useEffect(() => {
    async function getData() {
      const fetch = await (await window.fetch(baseLink)).json()
      const lulaData = (fetch.cand.filter(e => e.nm === 'LULA')[0])

      setVotosValidos(lulaData.vap)
      setVotosValidosPct(lulaData.pvap)
      setTotalApuradoPct(fetch.pst)
    }

    getData()
  }, [])

  return (
    <div className="App-header h-full relative">
      <h1 className='font-mono text-8xl mb-10 text-red-700 font-bold'>Lula já está eleito?</h1>

      <div className='grid grid-cols-2 gap-y-5 gap-x-3 bg-gray-700 p-10 rounded-lg'>
        <div>
          <p className=''><strong>Votos em Lula:</strong> {parseInt(votosValidos).toLocaleString('pt-BR')}</p>
        </div>

        <div>
          <p className=''><strong>Porcentagem:</strong> {votosValidosPct}%</p>
        </div>

        <div className='col-span-2'>
          <p className='text-center'><strong>Porcentagem total apurada: </strong>{totalApuradoPct}%</p>
        </div>

        {parseInt(totalApuradoPct) === 100 ? parseFloat(votosValidosPct) >= 50  ? <p className='text-center col-span-2 text-green-400'>Eleito em primeiro turno até o momento</p> : <p className='text-center col-span-2 text-red-400'>Terá segundo turno</p> : null}
      </div>

      <div className='fixed bottom-4 left-4 text-sm'>
        para a apuração completa <a className="underline" href="https://resultados.tse.jus.br/oficial/app/index.html#/eleicao/resultados">visite o site do TSE</a>
      </div>
    </div>
  );
}

export default App;
