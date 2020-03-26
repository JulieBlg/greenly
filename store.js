export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      const { partnerName, expiresIn, discountInPercent } = this.discountOffers[
        i
      ];

      //Pour les partenaires "classiques", on diminue le pourcentage de 1 tous les jours, sauf Backmarket où ça fait 2 et Ilek qui ne décroit jamais
      if (!["Naturalia", "Vinted"].includes(partnerName)) {
        if (discountInPercent > 0) {
          if (partnerName !== "Ilek") {
            discountInPercent = discountInPercent - 1;
          }
          //Pour BackMarket ça va plus vite
          if (partnerName === "BackMarket") {
            discountInPercent = discountInPercent - 1;
          }
        }
        //Naturalia et Vinted voient leur pourcentage augmenter au fur et à mesure (mais reste inférieur à 50)
      } else {
        if (discountInPercent < 50) {
          discountInPercent = discountInPercent + 1;
          //Pour Naturalia, rien de plus avant la date d'expiration
          //Pour Vinted, à 10j et moins on prend plus 1 (donc +2 en tout)
          if (partnerName === "Vinted") {
            if (expiresIn < 11) {
              if (discountInPercent < 50) {
                discountInPercent = discountInPercent + 1;
              }
            }
            //A 5j et moins, on prend plus 1 (dond +3 en tout)
            if (expiresIn < 6) {
              if (discountInPercent < 50) {
                discountInPercent = discountInPercent + 1;
              }
            }
          }
        }
      }
      //Pour tout le monde sauf Ilek, la date d'expiration est update
      if (partnerName !== "Ilek") {
        expiresIn = expiresIn - 1;
      }
      //Après la date d'expiration
      if (expiresIn < 0) {
        if (partnerName !== "Naturalia") {
          if (partnerName !== "Vinted") {
            //Pour les partenaires classiques, on prend moins 1 après la date d'expiration, donc moins 2 en tout
            if (discountInPercent > 0) {
              if (partnerName !== "Ilek") {
                discountInPercent = discountInPercent - 1;
              }
              //Pour BackMarket on descend encore plus vite
              if (partnerName === "BackMarket") {
                discountInPercent = discountInPercent - 1;
              }
            }
            //Vinted a son pourcentage à 0 après la date d'expiration
          } else {
            discountInPercent = 0;
          }
          //Pour Naturalia, après la date d'expiration, on prend plus 1 (donc +2 en tout avec l'augmentation classique)
        } else {
          if (discountInPercent < 50) {
            discountInPercent = discountInPercent + 1;
          }
        }
      }
      this.discountOffers[i] = { partnerName, expiresIn, discountInPercent };
    }

    return this.discountOffers;
  }
}
