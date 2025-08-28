import React, { useEffect } from 'react'
import Loader from '../loader/Loader'
import { useSelector } from 'react-redux'
import FeatureSections from '../homepagefaturesection/FeatureSections'
import HomeAllProducts from '../homepagefaturesection/HomeAllProducts'
import HomeOfferModal from '../homepageoffermodal/HomeOfferModal'
import CategoriesContainer from '../categories/CategoriesContainer'
import SellerSlider from '../shop-by-seller/SellerSlider'
import HomeSkeleton from './HomeSkeleton'

const HomePage = () => {

    const setting = useSelector(state => state.Setting)
    const language = useSelector(state => state.Language.selectedLanguage)
    

    return (
        <>
            <div>
                {setting?.setting == null ? <HomeSkeleton /> :
                    <>
                        <FeatureSections />
                        <CategoriesContainer />
                        <HomeAllProducts />
                        {setting.setting && setting?.setting?.popup_enabled === "1" &&
                            <HomeOfferModal />
                        }
                        <SellerSlider />
                    </>
                }
            </div>
        </>
    )
}

export default HomePage