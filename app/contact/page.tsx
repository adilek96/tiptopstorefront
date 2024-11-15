import React from "react";
import Image from "next/image";
import SocialHeader from "@/components/SocialHeader";

export default function Contact() {
  return (
    <section className="w-full    flex  justify-center items-center flex-col cursor-default">
      <div
        className="w-[95vw] bg-white py-24 my-10  shadow-2xl flex flex-col md:flex-row justify-center items-center relative z-10"
        id="about-us"
      >
        <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
          <span className="py-1">О нас</span>
        </div>
        <div className="w-[80%] md:w-[40%] h-full flex justify-center items-center">
          <Image src={"/logotip.svg"} alt="Logo" width={300} height={300} />
        </div>

        <div className="w-[90%] md:w-[60%] h-full flex justify-center items-center flex-col">
          <p className="w-[100%] md:w-[80%] text-calclg">
            Добро пожаловать в наш магазин, где каждый подарок превращается в
            настоящий источник радости! Мы предлагаем уникальные сувениры,
            оригинальные настольные игры, стильные декорации и волшебные
            гирлянды, которые придадут вашему дому уют и праздничное настроение.
          </p>
          <p className="w-[100%] md:w-[80%] text-calclg">
            Наши товары — это не просто вещи, а настоящие моменты для вас и
            ваших близких. В нашем ассортименте вы найдете идеальные подарки для
            любого случая, которые станут яркими акцентами в вашем интерьере и
            создадут атмосферу тепла и волшебства. Мы верим, что каждый момент
            стоит того, чтобы его сделать незабываемым, и готовы помочь вам в
            этом.
          </p>

          <p className="w-[80%] mt-5 text-calcxl font-bold">
            <span>Связь с нами:</span>
            <span className="text-nowrap"> +994 55 302 32 62</span>
          </p>
          <div className="mt-5">
            <SocialHeader size={6} />
          </div>
        </div>
      </div>
      <div
        className="w-[95vw] bg-white py-24 my-10 shadow-2xl flex justify-center items-center relative z-10"
        id="refound-policy"
      >
        <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
          <span className="py-1">Политика возрата</span>
        </div>
        <div className="w-[90%] md:w-[60%] h-full flex justify-center items-center flex-col">
          <p className="w-[100%] md:w-[80%] text-calclg">
            Наша политика возврата направлена на то, чтобы каждая ваша покупка
            была комфортной и беззаботной. Если товар не оправдал ожиданий, вы
            можете вернуть его в течение 14 дней с момента получения, при
            условии, что он не использовался, сохранен в оригинальной упаковке и
            у вас есть подтверждение покупки. В случае обнаружения заводского
            брака в этот период мы с радостью заменим товар на новый. Свяжитесь
            с нашей службой поддержки, и мы поможем вам с оформлением возврата
            или обмена. Мы ценим ваше доверие и стремимся сделать процесс
            покупки приятным и надежным!
          </p>
        </div>
      </div>
      <div
        className="w-[95vw] py-24  my-10 shadow-2xl flex justify-center bg-white items-center relative z-10"
        id="delivery"
      >
        <div className="ribbon-del flex justify-center absolute top-10 left-0 z-50">
          <span className="py-1">Доставка</span>
        </div>
        <div className="w-[90%] md:w-[60%]  flex justify-center items-center flex-col">
          <h3 className="text-calclg font-bold">
            Мы предлагаем три удобных способа доставки, чтобы вы могли получить
            ваш заказ максимально комфортно и в нужное время:
          </h3>
          <p className="w-[80%] text-calcmd mt-3">
            <span className="font-bold">
              Бесплатная доставка до станции метро
            </span>
            —
            <i>
              для вашего удобства мы бесплатно доставим заказ до любой станции
              метро в Баку в удобное для вас время. Просто выберите эту опцию
              при оформлении заказа, и мы сделаем все остальное.
            </i>
          </p>

          <p className="w-[80%] text-calcmd mt-3">
            <span className="font-bold">
              Доставка до двери в черте города Баку
            </span>
            —
            <i>
              для тех, кто предпочитает получить заказ прямо на дом. Стоимость
              этой услуги составляет фиксированные 5 AZN, а время доставки вы
              выбираете сами. Мы доставим ваш заказ по указанному адресу без
              задержек.
            </i>
          </p>

          <p className="w-[80%] text-calcmd mt-3">
            <span className="font-bold">Доставка по Азербайджану</span>—
            <i>
              если вы находитесь за пределами Баку, мы отправим ваш заказ почтой
              или курьерской службой. Стоимость рассчитывается в зависимости от
              веса и габаритов товара. Вы можете выбрать нужный способ доставки
              при оформлении покупки, и ваш заказ будет отправлен в кратчайшие
              сроки.
            </i>
          </p>
          <p className=" mt-2 text-calclg">
            После оформления заказа наш оператор свяжется с вами по указанному
            номеру телефона, чтобы подтвердить покупку и уточнить адрес
            доставки. Мы стремимся сделать процесс доставки удобным и приятным
            для вас!
          </p>
        </div>
      </div>
    </section>
  );
}
