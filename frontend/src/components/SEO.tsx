import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

const SITE_NAME = 'Emanuel Peracchia | Servicio de Jardinería'
const DEFAULT_DESC = 'Corte de césped, poda de arbustos y limpieza de canteros en Córdoba. Presupuesto sin compromiso.'

export default function SEO({ title, description, image }: SEOProps) {
  const fullTitle = title ? `${title} | Emanuel Peracchia` : SITE_NAME
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || DEFAULT_DESC} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || DEFAULT_DESC} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  )
}
