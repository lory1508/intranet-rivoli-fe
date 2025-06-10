export const menu = [
  {
    title: 'Home',
    icon: 'hugeicons:home-06',
    path: '/',
  },
  {
    title: 'Applicativi',
    icon: 'hugeicons:dialpad-square-01',
    path: '/applicativi',
  },
  {
    title: 'Rubrica',
    icon: 'hugeicons:contact-01',
    path: '/rubrica',
  },
  {
    title: 'News',
    icon: 'hugeicons:news',
    path: '/news',
  },
  {
    title: 'Bacheca dipendenti',
    icon: 'hugeicons:pin',
    path: '/bacheca-dipendenti',
  },
  {
    title: 'Avvocatura',
    icon: 'hugeicons:justice-scale-02',
    path: '/avvocatura',
    submenu: [
      {
        title: 'Tutti gli articoli',
        path: '/avvocatura',
      },
      {
        title: 'Appalti ',
        path: '/avvocatura/appalti',
      },
      {
        title: 'Urbanistica',
        path: '/avvocatura/urbanistica',
      },
      {
        title: 'Risarcimento danno',
        path: '/avvocatura/risarcimento-danno',
      },
      {
        title: 'Sanzioni amministrative',
        path: '/avvocatura/sanzioni-amministrative',
      },
      {
        title: 'Tributi',
        path: '/avvocatura/tributi',
      },
      {
        title: 'Varie',
        path: '/avvocatura/varie',
      },
      {
        title: 'Formazione',
        path: '/avvocatura/formazione',
      },
    ],
  },
  {
    title: 'Modulistica',
    icon: 'hugeicons:file-01',
    path: '/modulistica',
  },
  {
    title: 'Manuali',
    icon: 'streamline:manual-book',
    path: '/manuali',
  },
  {
    title: 'Sicurezza lavoratori',
    icon: 'hugeicons:knight-shield',
    path: '/sicurezza-lavoratori',
    submenu: [
      {
        title: 'Tutti gli articoli',
        path: '/sicurezza-lavoratori',
      },
      {
        title: 'Schede di comportamento ',
        path: '/sicurezza-lavoratori/schede-di-comportamento',
      },
      {
        title: 'Piani di emergenza',
        path: '/sicurezza-lavoratori/piani-di-emergenza',
      },
      {
        title: 'Valutazione dei rischi',
        path: '/sicurezza-lavoratori/valutazione-dei-rischi',
      },
      {
        title: 'Referenti',
        path: '/sicurezza-lavoratori/referenti',
      },
      {
        title: 'Relazione DVR Stress',
        path: '/sicurezza-lavoratori/relazione-dvr-stress',
      },
      {
        title: 'Formazione',
        path: '/sicurezza-lavoratori/formazione',
      },
      {
        title: 'Protocollo di sicurezza emergenza COVID19',
        path: '/sicurezza-lavoratori/protocollo-di-sicurezza-emergenza-covid19',
      },
    ],
  },
  {
    title: 'Bacheca RSU',
    icon: 'hugeicons:megaphone-02',
    path: '/bacheca-rsu',
  },
]

export const websiteIdentity = {
  name: 'Città di Rivoli',
  logo: {
    img: '/Stemma_Rivoli.png',
    alt: 'Stemma Rivoli',
  },
  footer: {
    title: 'Città di Rivoli',
    address: 'Corso Francia 98, 10098, Rivoli',
    phone: {
      label: 'Telefono centralino',
      number: '011 951.3300',
    },
    fax: {
      label: 'Fax',
      number: '011 951.3399',
    },
    cf: {
      label: 'Partita IVA / Codice fiscale',
      number: '00529840019',
    },
    author: 'Sistemi Informativi e Archivistici',
  },
}
