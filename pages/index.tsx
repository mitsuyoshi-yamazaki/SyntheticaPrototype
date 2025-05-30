import Head from 'next/head'
import Layout from '../components/Layout'
import Canvas from '../components/Canvas'

export default function Home() {
  return (
    <>
      <Head>
        <title>Synthetica Prototype</title>
        <meta name="description" content="MMOゲームプロトタイプ - エージェントシミュレーション" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="w-full h-screen flex flex-col">
          <header className="bg-slate-800 text-white p-4">
            <h1 className="text-2xl font-bold">Synthetica Prototype</h1>
            <p className="text-slate-300">エージェントシミュレーションゲーム</p>
          </header>
          <main className="flex-1 bg-gray-100">
            <Canvas />
          </main>
        </div>
      </Layout>
    </>
  )
}
