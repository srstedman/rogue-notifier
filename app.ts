import * as rp from 'request-promise';
import cheerio from 'cheerio';
import nodemailer from 'nodemailer';
import moment from 'moment';

interface Item {
  uri: string;
  selector: string;
  text?: string;
}

const items: Item[] = [
  // {
  //   uri: 'https://www.roguefitness.com/rogue-45lb-ohio-power-bar-black-zinc',
  //   selector: '.btn-add-to-cart'
  // },
  // {
  //   uri: 'https://www.roguefitness.com/rogue-45lb-ohio-power-bar-stainless',
  //   selector: '.btn-add-to-cart'
  // },
  {
    uri:
      'https://www.roguefitness.com/monsterlite-double-change-plate-storage',
    selector: '.btn-add-to-cart'
  },
  {
    uri: 'https://www.roguefitness.com/monster-lite-sandwich-j-cup-pair',
    selector: '.btn-add-to-cart'
  },
  // {
  //   uri: 'https://www.roguefitness.com/horizontal-plate-rack-2-0',
  //   selector: '.btn-add-to-cart'
  // },
  {
    uri: 'https://www.roguefitness.com/rogue-competition-bumper-plate-cart',
    selector: '.btn-add-to-cart'
  },
  {
    uri:
      'https://www.roguefitness.com/rogue-echo-bumper-plates-with-white-text',
    // selector: '.btn-add-to-cart'
    selector: 'div.grouped-item div.input-text.item-qty',
    text: '45LB Rogue Echo Pair V2'
  },
  {
    uri: 'https://www.roguefitness.com/rogue-lb-change-plates',
    selector: '.btn-add-to-cart'
  }
];

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const log = function (message?: string, error?: any) {
  console.log(`[${moment().format(TIMESTAMP_FORMAT)}] ${message || error}`);
};

async function main() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rogue.notifier.ss@gmail.com',
      pass: ''
    }
  });

  // check every 30 seconds
  setInterval(async function () {
    log(`checking product stock...`);

    for (const item of items) {
      const page = await rp.get(item.uri).catch((error) => {
        log(error && error.message ? error.message : error);
      });

      const $ = cheerio.load(page);

      if ($) {
        let elementExists: boolean = false;
        if (item.text) {
          // sometimes there are multiple items per page and we only
          // want to be notified if a certain one is in stock
          const textElement: Cheerio = $(item.selector)
            .parent('.grouped-item-row')
            .find('.item-name').filter(function(index, el) {
              return $(el).text().trim() === item.text;
            });
          elementExists = !!textElement.get(0);
        } else {
          elementExists = !!$(item.selector).get(0);
        }
        if (elementExists) {
          // send email
          const itemName = item.text ? item.text : item.uri;
          log(`found product ${itemName}`);

          transporter.sendMail({
            priority: 'high',
            from: '"Rogue Notifier" <rogue.notifier.ss@gmail.com>',
            to: 'srstedman@gmail.com',
            subject: `Back In Stock Alert: ${itemName}`,
            text: `Rogue product back in stock! ${itemName}`,
            html: `Rogue product back in stock! <a href=${item.uri}>${itemName}</a>`
          });
        }
      }
    }
  }, 30000);
}

main();
