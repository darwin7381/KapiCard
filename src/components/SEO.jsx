const SEO = ({ title, description, keywords }) => {
    return (
        <>
            <title>{title} | KapiCard</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords.join(', ')} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </>
    );
};

export default SEO;
