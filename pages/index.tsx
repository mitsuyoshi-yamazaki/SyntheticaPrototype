import Head from 'next/head'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

// p5.jsコンポーネントをSSRを無効にして動的インポート
const Canvas = dynamic(() => import('../components/Canvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '400px' }}>
      <p className="text-gray-600">Canvas Loading...</p>
    </div>
  )
})

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
