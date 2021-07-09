import { images as img } from '../constants';

export const topProducts = [
  {
    category: "Top Products"
  },
  [
    {
      id: "2131548976513548",
      code: "64156198419641",
      name: "NBA Jersey",
      image: img.jersey_suns_0_front,
      price: "69.99",
      backgroundColor: '#DF6614',
      sizes: [ "S", "M", "L", "XL" ],
      colors: [
        {
          name: "Orange",
          value: "#DF6614"
        },
        {
          name: "Purple",
          value: "#312A53"
        },
        {
          name: "Black",
          value: "#1E201F"
        }
      ]
    },
    {
      id: "5123186789153486",
      code: "56132168484863",
      name: "NBA Jersey",
      image: img.jersey_rockets_1_front,
      price: "74.99",
      backgroundColor: '#C11A2A',
      sizes: [ "S", "M", "L", "XL" ],
      colors: [
        {
          name: "Red",
          value: "#C11A2A"
        }
      ]
    }
  ]
]

export const caps = [
  {
    category: "Caps"
  },
  [
    {
      id: "512365489798121",
      code: "5461456541686",
      name: "NBA Cap",
      image: img.cap_la_champ,
      price: "49.99",
      backgroundColor: '#1E201F',
      sizes: [],
      colors: [
        {
          name: "Black",
          value: "#1E201F"
        }
      ]
    },
    {
      id: "9887452316548910",
      code: "6476513201688416",
      name: "NBA Cap",
      image: img.cap_la_blue,
      price: "34.99",
      backgroundColor: '#5184C3',
      sizes: [],
      colors: [
        {
          name: "Blue",
          value: "#5184C3"
        }
      ]
    }
  ]
]

export const jerseys = [
  {
    category: "Jerseys"
  },
  [
    {
      id: "32156405640156",
      code: "64156198419641",
      name: "NBA Jersey",
      image: img.jersey_suns_0_front,
      price: "69.99",
      backgroundColor: '#DF6614',
      sizes: [ "S", "M", "L", "XL" ],
      colors: [
        {
          name: "Orange",
          value: "#DF6614"
        },
        {
          name: "Purple",
          value: "#312A53"
        },
        {
          name: "Black",
          value: "#1E201F"
        }
      ]
    },
    {
      id: "90118408946894156",
      code: "56132168484863",
      name: "NBA Jersey",
      image: img.jersey_rockets_1_front,
      price: "74.99",
      backgroundColor: '#C11A2A',
      sizes: [ "S", "M", "L", "XL" ],
      colors: [
        {
          name: "Red",
          value: "#C11A2A"
        }
      ]
    }
  ]
]

export const tShirts = [
  {
    category: "T-Shirts"
  },
  [
    {
      id: "6561480854180787",
      code: "516318915318461",
      name: "NBA T-Shirt",
      image: img.tshirt_nets_11_front,
      price: "59.99",
      backgroundColor: '#1B5EA4',
      sizes: [ "S", "M", "L", "XL" ],
      colors: [
        {
          name: "Blue",
          value: "#1B5EA4"
        },
        {
          name: "Black",
          value: "#1E201F"
        }
      ]
    },
    {
      id: "1058640809490651",
      code: "64864615616549",
      name: "NBA T-Shirt",
      image: img.tshirt_la_3_front,
      price: "64.99",
      backgroundColor: '#E6E3DD',
      sizes: [ "S", "M", "L", "XL" ],
      colors: [
        {
          name: "White",
          value: "#E6E3DD"
        }
      ]
    }
  ]
]

export const products = [ topProducts, caps, jerseys, tShirts ]