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
    this.partnersToIgnore = ["Ilek"];
    this.specificPartners = ["Naturalia", "Vinted", "Ilek", "BackMarket"];
  }

  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      const isNotPartnerToIgnore = !this.partnersToIgnore.includes(
        this.discountOffers[i].partnerName
      );

      if (isNotPartnerToIgnore) {
        //UPDATE DAYS BEFORE EXPIRATION
        this.discountOffers[i].expiresIn = this.discountOffers[i].expiresIn - 1;

        //CALCULATE CURRENT DISCOUNT PERCENTAGE
        let percentage = this.calculateDiscountOfTheDay(this.discountOffers[i]);

        //CHECK CONDITIONS ON PERCENTAGE
        if (percentage > 50) percentage = 50;
        else if (percentage < 0) percentage = 0;

        this.discountOffers[i].discountInPercent = percentage;
      }
    }

    return this.discountOffers;
  }

  calculateDiscountOfTheDay(discountOffer) {
    const isExpired = discountOffer.expiresIn < 0;
    let percentage = discountOffer.discountInPercent;
    const percentageOfTheDay = isExpired ? 2 : 1;

    if (!this.specificPartners.includes(discountOffer.partnerName)) {
      //CLASSIC PARTNERS
      percentage -= percentageOfTheDay;
    } else {
      //SPECIFIC PARTNERS
      switch (discountOffer.partnerName) {
        case "BackMarket":
          percentage -= percentageOfTheDay * 2;
          break;
        case "Vinted":
          percentage = this.generatePercentageForVinted(
            percentage,
            discountOffer.expiresIn
          );
          break;
        case "Naturalia":
          percentage += percentageOfTheDay;
          break;
      }
    }

    return percentage;
  }

  generatePercentageForVinted(discountInPercent, expiresIn) {
    if (expiresIn < 0) {
      discountInPercent = 0;
    } else {
      if (expiresIn < 11) {
        discountInPercent += 2;
        if (expiresIn < 6) {
          discountInPercent += 1;
        }
      } else {
        discountInPercent += 1;
      }
    }

    return discountInPercent;
  }
}
