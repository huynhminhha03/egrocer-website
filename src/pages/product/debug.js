import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DebugProduct() {
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    if (router.isReady) {
      setDebugInfo({
        slug: router.query.slug,
        asPath: router.asPath,
        route: router.route,
        query: router.query,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Server',
        url: typeof window !== 'undefined' ? window.location.href : 'Server',
        pathname: typeof window !== 'undefined' ? window.location.pathname : 'Server',
      });
    }
  }, [router.isReady, router.query, router.asPath]);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Debug Product Page</h1>
      <h2>Router Debug Info:</h2>
      <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <h2>Test Different URLs:</h2>
      <ul>
        <li><a href="/product/test">Simple: /product/test</a></li>
        <li><a href="/product/Rau-m">Vietnamese: /product/Rau-m</a></li>
        <li><a href="/product/rau-m">Lowercase: /product/rau-m</a></li>
        <li><a href="/product/abc123">Alphanumeric: /product/abc123</a></li>
      </ul>
      
      <h2>Current URL Analysis:</h2>
      <p><strong>Expected slug:</strong> {router.query.slug || 'Loading...'}</p>
      <p><strong>URL contains Vietnamese chars:</strong> {/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(router.query.slug || '') ? 'Yes' : 'No'}</p>
    </div>
  );
}
