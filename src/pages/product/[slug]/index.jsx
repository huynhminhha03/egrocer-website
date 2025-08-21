import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// const SocialPages = dynamic(() => import('@/components/commonComponents/SocialPages'), { ssr: false })
import dynamic from "next/dynamic";
const ProductDescriptionPage = dynamic(
  () => import("@/components/pagecomponents/ProductDescriptionPage"),
  { ssr: false },
);
import MetaData from "@/components/metadata-component/MetaData";
import axios from "axios";
import { extractJSONFromMarkup } from "@/utils/helperFunction";

// Function to determine if we should use SSR or client-side routing
const shouldUseSSR = () => {
  return process.env.NEXT_PUBLIC_SEO === "true";
};

// Define SSR function conditionally
let getServerSidePropsFunction = null;

if (shouldUseSSR()) {
  getServerSidePropsFunction = async (context) => {
    const { slug } = context.params;
    let isMetadata = false;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_SUBURL}/products/get_seo_things`,
        {
          params: {
            slug: slug,
          },
        },
      );

      if (
        response.data.data?.meta_title != null &&
        response.data.data?.meta_description != null &&
        response.data.data?.meta_keywords != null
      ) {
        isMetadata = true;
      }
      let metatitle = process.env.NEXT_PUBLIC_META_TITLE;
      let metaDescription = process.env.NEXT_PUBLIC_META_DESCRIPTION;
      let metaKeywords = process.env.NEXT_PUBLIC_META_KEYWORDS;
      let schemaMarkup = null;
      let og_image = null;
      let favicon = null;
      if (process.env.NEXT_PUBLIC_SEO == "true" && isMetadata == true) {
        const seoData = response.data.data;
        metatitle = seoData.meta_title;
        metaDescription = seoData.meta_description;
        metaKeywords = seoData.meta_keywords;
        og_image = seoData.og_image;
        favicon = seoData.favicon;
        if (seoData.schema_markup) {
          schemaMarkup = extractJSONFromMarkup(seoData.schema_markup);
        }
      }
      return {
        props: {
          slug: slug,
          title: metatitle,
          description: metaDescription,
          keywords: metaKeywords,
          og_image,
          schemaMarkup: schemaMarkup ? JSON.stringify(schemaMarkup) : null,
          favicon: favicon ? favicon : null,
        },
      };
    } catch (error) {
      console.log("error", error);
      return {
        props: {
          slug: slug,
          title: process.env.NEXT_PUBLIC_META_TITLE || "Product",
          description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "",
          keywords: process.env.NEXT_PUBLIC_META_KEYWORDS || "",
          og_image: null,
          schemaMarkup: null,
          favicon: null,
        },
      };
    }
  };
}

// Export the function conditionally
export const getServerSideProps = getServerSidePropsFunction;

 

export default function Index({
  slug: propSlug,
  title: propTitle,
  description: propDescription,
  keywords: propKeywords,
  og_image,
  schemaMarkup,
  favicon
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  
  // Prevent hydration mismatch by only showing content after client mount
  useEffect(() => {
    setIsClient(true);
    // Enable debug mode if URL contains debug parameter
    if (typeof window !== 'undefined') {
      setDebugMode(window.location.search.includes('debug=true'));
    }
  }, []);
  
  // Use props from SSR if available, otherwise get from router (client-side)
  const slug = propSlug || router.query.slug;
  const title = propTitle || process.env.NEXT_PUBLIC_META_TITLE || "Product";
  const description = propDescription || process.env.NEXT_PUBLIC_META_DESCRIPTION || "";
  const keywords = propKeywords || process.env.NEXT_PUBLIC_META_KEYWORDS || "";
  
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/product/${slug}`;
  
  // Show loading state until client is ready (prevents hydration mismatch)
  if (!isClient) {
    return (
      <>
        <MetaData
          pageName="/product/"
          title={title}
          description={description}
          keywords={keywords}
          structuredData={schemaMarkup}
          ogUrl={pageUrl}
          ogImage={og_image}
          favicon={favicon}
        />
        <div>Loading...</div>
      </>
    );
  }

  // Debug mode - show detailed information
  if (debugMode) {
    return (
      <>
        <MetaData
          pageName="/product/"
          title={title}
          description={description}
          keywords={keywords}
          structuredData={schemaMarkup}
          ogUrl={pageUrl}
          ogImage={og_image}
          favicon={favicon}
        />
        <div style={{ padding: "20px", fontFamily: "monospace" }}>
          <h1>Product Page Debug Mode</h1>
          <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
            <h3>Debug Information:</h3>
            <p><strong>Slug from props:</strong> {propSlug || 'undefined'}</p>
            <p><strong>Slug from router:</strong> {router.query.slug || 'undefined'}</p>
            <p><strong>Final slug:</strong> {slug || 'undefined'}</p>
            <p><strong>Router ready:</strong> {router.isReady ? 'Yes' : 'No'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server'}</p>
            <p><strong>Decoded slug:</strong> {slug ? decodeURIComponent(slug) : 'undefined'}</p>
            <p><strong>Encoded slug:</strong> {slug ? encodeURIComponent(slug) : 'undefined'}</p>
            <p><strong>Contains Vietnamese chars:</strong> {/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(slug || '') ? 'Yes' : 'No'}</p>
          </div>
          <div style={{ background: "#e8f4f8", padding: "15px", borderRadius: "5px" }}>
            <h3>Test Links:</h3>
            <ul>
              <li><a href="/product/test?debug=true">Test page with debug</a></li>
              <li><a href="/product/Rau-m?debug=true">Rau-m with debug</a></li>
              <li><a href="/product/debug">Debug page</a></li>
            </ul>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setDebugMode(false)} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
              Exit Debug Mode
            </button>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <MetaData
        pageName="/product/"
        title={title}
        description={description}
        keywords={keywords}
        structuredData={schemaMarkup}
        ogUrl={pageUrl}
        ogImage={og_image}
        favicon={favicon}
      />
      <ProductDescriptionPage />
    </>
  );
}
