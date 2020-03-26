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
      const isClassicPartner = ![
        "Naturalia",
        "Vinted",
        "Ilek",
        "BackMarket"
      ].includes(this.discountOffers[i].partnerName);

      if (isClassicPartner) {
        this.discountOffers[i] = this.generateDiscountForClassicPartners(
          this.discountOffers[i]
        );
      } else {
        var { partnerName, expiresIn, discountInPercent } = this.discountOffers[
          i
        ];

        if (partnerName === "Naturalia") {
          if (discountInPercent < 50) {
            discountInPercent = discountInPercent + 1;
          }
        }

        if (partnerName === "BackMarket") {
          if (discountInPercent > 1) {
            discountInPercent = discountInPercent - 2;
          }
        }

        if (partnerName === "Vinted") {
          if (expiresIn < 11) {
            if (discountInPercent < 49) {
              discountInPercent = discountInPercent + 2;
            }
          }
          if (expiresIn < 6) {
            if (discountInPercent < 50) {
              discountInPercent = discountInPercent + 1;
            }
          }
        }

        if (partnerName !== "Ilek") expiresIn = expiresIn - 1;

        if (expiresIn < 0) {
          if (partnerName === "Vinted") {
            discountInPercent = 0;
          }

          if (partnerName === "BackMarket") {
            if (discountInPercent > 1) {
              discountInPercent = discountInPercent - 2;
            }
          }

          if (partnerName === "Naturalia") {
            if (discountInPercent < 50) {
              discountInPercent = discountInPercent + 1;
            }
          }
        }

        this.discountOffers[i] = { partnerName, expiresIn, discountInPercent };
      }
    }

    return this.discountOffers;
  }

  generateDiscountForClassicPartners(discountOffer) {
    var { partnerName, expiresIn, discountInPercent } = discountOffer;

    if (discountInPercent > 0) {
      discountInPercent = discountInPercent - 1;
    }

    expiresIn = expiresIn - 1;

    if (expiresIn < 0) {
      if (discountInPercent > 0) {
        discountInPercent = discountInPercent - 1;
      }
    }

    return { partnerName, expiresIn, discountInPercent };
  }
}
