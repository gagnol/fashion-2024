
import ProductModel from '@/lib/product-model'
import dbConnect from "@/lib/db-connect";
import HeroBanner from './components/sections-home/HeroBanner';
import WinterCollection from './components/sections-home/WinterCollection';
import Hero2 from './components/sections-home/Hero2';
import Advertise from './components/sections-home/Advertise';
import GridList from './components/sections-home/GridList';
import Newstock from './components/sections-home/NewStock';
import GridList2 from './components/sections-home/GridList2';
import Trending from './components/sections-home/Trending';

export default async function Home() {
  await dbConnect();
  const productsDoc = (await ProductModel.find().lean());
  const menDoc = (await ProductModel.find({department:"Men"}).lean());
  const womenDoc = (await ProductModel.find({department:"Women"}).lean());

  const products = await JSON.parse(JSON.stringify(productsDoc));
  const men = await JSON.parse(JSON.stringify(menDoc));
  const women = await JSON.parse(JSON.stringify(womenDoc));
 
 
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto py-2 overflow-x-hidden">
    <HeroBanner/>
    <Hero2/>
    <WinterCollection products={products}/>
    <Advertise/>
    <GridList products={men}/>
    <Newstock products={products}/>
    <GridList2 products={women}/>
    <Trending/>

      </div>
    </main>
  );
}

