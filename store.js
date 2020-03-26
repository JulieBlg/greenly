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

      if (this.discountOffers[i].partnerName !== "Ilek") {
        this.discountOffers[i].expiresIn = this.discountOffers[i].expiresIn - 1;
      }

      if (isClassicPartner) {
        this.discountOffers[i] = this.generateDiscountForClassicPartners(
          this.discountOffers[i]
        );
      } else {
        if (this.discountOffers[i].partnerName === "BackMarket")
          this.discountOffers[i] = this.generateDiscountForBackMarket(
            this.discountOffers[i]
          );

        if (this.discountOffers[i].partnerName === "Vinted")
          this.discountOffers[i] = this.generateDiscountForVinted(
            this.discountOffers[i]
          );

        if (this.discountOffers[i].partnerName === "Naturalia")
          this.discountOffers[i] = this.generateDiscountForNaturalia(
            this.discountOffers[i]
          );
      }
    }

    return this.discountOffers;
  }

  generateDiscountForClassicPartners(discountOffer) {
    var { partnerName, expiresIn, discountInPercent } = discountOffer;

    if (discountInPercent > 0) {
      discountInPercent -= 1;
    }

    if (expiresIn < 0 && discountInPercent > 0) {
      discountInPercent -= 1;
    }

    return { partnerName, expiresIn, discountInPercent };
  }

  generateDiscountForBackMarket(discountOffer) {
    var { partnerName, expiresIn, discountInPercent } = discountOffer;

    if (discountInPercent > 1) {
      discountInPercent -= 2;
    }

    if (expiresIn < 0 && discountInPercent > 1) {
      discountInPercent -= 2;
    }

    return { partnerName, expiresIn, discountInPercent };
  }

  generateDiscountForVinted(discountOffer) {
    var { partnerName, expiresIn, discountInPercent } = discountOffer;

    if (expiresIn < 0) {
      discountInPercent = 0;
    } else {
      if (expiresIn < 11 && discountInPercent < 49) {
        discountInPercent += 2;
        if (expiresIn < 6 && discountInPercent < 50) {
          discountInPercent += 1;
        }
      } else {
        discountInPercent += 1;
      }
    }

    return { partnerName, expiresIn, discountInPercent };
  }

  generateDiscountForNaturalia(discountOffer) {
    var { partnerName, expiresIn, discountInPercent } = discountOffer;

    if (discountInPercent < 50) {
      discountInPercent += 1;
    }

    if (expiresIn < 0) {
      if (discountInPercent < 50) {
        discountInPercent += 1;
      }
    }

    return { partnerName, expiresIn, discountInPercent };
  }
}
