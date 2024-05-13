
import AddToFavorite from "@/app/components/Product-detail/addToFavorite";
import AddToCart from "@/app/components/Product-detail/addToCart";
import ImageGallery from "@/app/components/Product-detail/image-gallery";
import Loading from "@/app/components/Product-detail/loading";
import Progressbar from "@/app/components/Product-detail/progressbar";
import Reviews from "@/app/components/Product-detail/reviews";
import Slider from "@/app/components/Slider";
import Rating from "@/app/components/rating";
import dbConnect from "@/lib/db-connect";
import ProductModel from "@/lib/product-model";
import TaskModel from "@/lib/task-model";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import CountryTaxes from "@/app/components/Product-detail/countryTaxes";
import ReviewForm from "@/app/components/Product-detail/reviewForm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SizePicker from "@/app/components/Product-detail/sizePicker";
import ColorPicker from "@/app/components/Product-detail/colorPicker";
import Topimage from "@/app/components/Product-detail/topImage";
import Middleimage from "@/app/components/Product-detail/middleImage";

export default async function ProductDetail({ params }: { params: { slug: string } }) {

  const slug = params.slug;

  await dbConnect();
  const productDocs = (await ProductModel.findOne({ slug }))
  const product = JSON.parse(JSON.stringify(productDocs));

  const similarProductsDocs = (await ProductModel.find({ category: product.category }, "-reviews"))
  const similarProducts = JSON.parse(JSON.stringify(similarProductsDocs));

  const questionProductsDocs = (await TaskModel.find({ product: product._id }, "-reviews"))
  const questionProducts = JSON.parse(JSON.stringify(questionProductsDocs));

  const discountPrice = Math.ceil(product.price - (product.price * (product.discount / 100)))

  const videoCounter = product?.video?.length || 0;
  const imageCounter = product?.image?.length || 0;
  const countAnswer = questionProducts?.length || 0;
  const countReviews = product?.reviews?.length || 0

  const session = await getServerSession();

  //CUSTOMER REVIEWS

  const reviewsMaping = product.reviews.map((item: any) => {
    return item.rating;
  });

  const result: Record<string, number> = {};

  // Initialize quantities for all ratings from 1 to 5
  for (let i = 1; i <= 5; i++) {
    result[i.toString()] = 0;
  }

  reviewsMaping.forEach((x: any) => {
    result[x] = (result[x] || 0) + 1;
  });

  const reviewsPercentage = Object.entries(result).map((entry) => {
    return entry;
  });

  return (
    <Loading >
      <div className="flex flex-wrap sm:justify-center lg:justify-start ml-10 text-white">
        <Topimage product={product}/>
        <div >
          <ImageGallery product={product} />
          <div className="w-[483px] h-[240px] bg-base-200 mt-5 text-center p-2 " >
            <div className="w-[80%] mx-auto">
              <p><strong>We want you to know</strong></p>
            </div>
            <div className="w-[80%] mx-auto">
              <div className="text-[14px]"><p></p>
                <p>  Discover the legendary range of colors and sizes available at our store! 
                Explore endless possibilities to express your style. 
                Visit us today and unleash your creativity!
                  <br />
                  <span >Learn more about availability.</span>
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] ml-5">
          <h4 className="text-[24px] text-white">{product.name}</h4>
          <h4>Seller: <a className="text-primary">{product.brand}</a></h4>
          <div className="flex flex-wrap items-center space-x-2 mb-2  border-b-2 ">
            <div className="my-2">
              <div className="flex">
              <span className="mx-1">{product?.rating}</span>

                <Rating value={product.rating} />
              </div>
            </div>
            <span className="ml-1">{product.numReviews} ratings </span>
            
          </div>
          <div className='mb-4 '>
            {product.bestSeller === "true" ?
              (
                <div className="flex" >
                  <Image alt='' src='/bestseller.png' width={124} height={38} style={{ width: 123, height: "auto" }} />
                  <p className="p-2">in&nbsp;{product.subcategory} </p>
                </div>)
              :
              (<></>)}
          </div>
          {/* Have Discount */}
          {product.discount > 0 ?
            <>
              <div className="flex items-start ">
                <h5 className="text-[28px] text-[#CC0C39] ">-{product.discount}%</h5>
                &nbsp;
                <h4 className="text-[28px] pl-2">
                  <span className="text-[13px] align-middle">€</span>
                    {Math.ceil(discountPrice)}
                </h4>
              </div>
              <div className="flex">
                <h6>List price :</h6>
                &nbsp;   &nbsp;<h6 className="line-through"> €{product.price}</h6>
              </div>
            </>
            :
            <div className="flex text-center">
              <h4 className="text-[28px] ">
                <span className=" text-[14px] font-bold mr-5">Price: </span>
                <span className="text-[13px] align-middle"> €</span>
                {product.price}
              </h4>
            </div>
          }
          <div className="flex text-center">
            <h4 className="text-[14px] font-bold mr-5">Department</h4>
            <h5 className="text-[14px] font-normal">{product.department}</h5>
          </div>
          <div className="flex text-center">
            <h4 className="text-[14px] font-bold mr-5" >Category</h4>
            <h5 className="text-[14px] font-normal">&nbsp;{product.category}</h5>
          </div>
          {/* COLOR SELECTION */}
          <SizePicker product={product}/>
          <ColorPicker product={product}/>
          <div className="mt-5">
            <h4 className="text-[16px] font-bold mt-2" >About this product</h4>
            <h5 className="text-[14px] font-normal text-neutral-content" >
              {product.description}
            </h5>
          </div>
        </div>
        {/* Rigth */}
        <div className=" w-[50%] md:w-[20%] ml-5 flex-col border-white border-[1px] rounded p-2">
          {product.discount > 0 ?
            <>
              <div className="flex align-middle">
                <h4 className="text-[28px] pl-2">
                  <span className=" text-[18px] align-middle">Price: </span>
                  <span className="text-[13px] align-middle"> €</span>
                  {Math.ceil(discountPrice)}
                </h4>
              </div>
            </>
            :
            <div className="flex align-middle">
              <h4 className="text-[28px] pl-2">
                <span className=" text-[18px] align-middle">Price: </span>
                <span className="text-[13px] align-middle">€</span>
                {product.price}
              </h4>
            </div>
          }

          <CountryTaxes discountPrice={discountPrice} product={product}/>

          {product.countInStock > 0 ? <>
            <h4 className="text-[18px] text-[#007600] font-normal my-2">
              In Stock
            </h4><br />
            <AddToCart product={product} discountPrice={discountPrice} />
             </>
            : <h4 className="text-[18px] text-[#B12704] font-normal my-2">
              Temporarily out of stock.</h4>}
          <h4 className="flex text-[14px] text-primary my-1">
            <FaLock color='#949494' fontSize={16} />
            &nbsp; Secure transaction</h4>
          <div className="flex my-0 ">
            <h4 className="text-neutral-content text-[14px] my-2">Sipping from</h4>
            <h5 className="font-normal text-[14px] my-2">&nbsp;{product.brand}</h5>
          </div>
          <div className="flex my-0 ">
            <h4 className="text-neutral-content text-[14px] my-2">Seller</h4>
            <h5 className="font-normal text-[14px] my-2">&nbsp;{product.brand}</h5>
          </div>
          <div className="flex my-2">
            
          </div>
          <div className="border-[#D5D9D9] border-[1px] rounded-lg
       bg-light-white relative py-[14px] px-[18px]">

            <Image
              src="/logo1.jpg"
              alt=" logo"
              width={50} height={31} />
           
            <br />
            <span >
              <h4 >Try Legendary and start saving today with
                <span className="text-[14px] text-neutral-content font-normal mt-2 pl-1">
                  <strong>Fast, FREE Delivery</strong>
                </span>
              </h4>
            </span>
          </div>
          <br />
          <label>
           
          </label>
          <AddToFavorite product={product} />
        </div>
      </div>
      <br />
      <br />
      <div >
        <br />
        <div className="relative max-w-screen-2xl  px-4 py-4 md:py-4">
          <h2 className="text-[21px] font-semibold px-10 pt-1 mb-2 text-white">
          Popular products based on this item
          </h2>
          <Slider product={product} />
        </div >
        {/******************Sizes ****************/}
        <Middleimage product={product}/>
        {/****************** CUSTOMER REVIEWS ****************/}
        <h2 className="text-[21px] pl-4 font-semibold mx-10 pt-2 border-t-2 text-white">
        Customer reviews
        </h2>
        <div className="grid grid-cols-2 px-10">
          <div className=" grid-cols-1 block mx-5 ">
            <div className="flex">
              <Rating value={product.rating} />
              <h1 className="px-2">{product.rating ? product.rating + ' out of 5' : 'Rating not available'}</h1>
            </div>
            <h2>{product.numReviews} Total Ratings</h2>
            <div className="border-white border-[1px] rounded p-2 my-5">
              {product.reviews && product.reviews.length > 0 ? (
                reviewsPercentage
                  ?.sort((a: any, b: any) => parseInt(b[0]) - parseInt(a[0]))
                  .map((item: any) => (
                    <div key={item}>
                      <Progressbar item={item} value={((item[1] / countReviews) * 100)} />
                    </div>
                  ))
              ) : (
                <p>No reviews for this product.</p>
              )}
            </div>

            {session ? (
              <>
                <ReviewForm session={session} product={product} />
              </>
            ) : (
              <div className='block '>
                <p >Review this product</p>
                <p className='text-neutral-400 text-[14px] my-2'>
                Share your thoughts with other customers
                </p>
                <Link href={`/signin?redirect=/product/${product.slug}`} >
                  <button className="my-[15px] p-1 w-[50%] btn btn-primary btn-outline" >
                  Write a customer review
                  </button>
                </Link>
              </div>
            )}

          </div>
          <div className="grid grid-cols-1 ">
            {product.reviews
              ?.map((item: any) => (
                <div key={item._id}>
                  <Reviews item={item} key={item} />
                </div>
              ))
              .slice(0, 10)
            }

          </div>
        </div>
      </div>
    </Loading>
  );
}
