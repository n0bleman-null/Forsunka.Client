export const Features = (props) => {
  let features = [
    {
      icon: "fa fa-comments-o",
      title: "ПРОФЕССИОНАЛЬНЫЕ КОНСУЛЬТАНТЫ",
      text: "Мы сможем вас проконсультировать по любым вопросам касательно работ.",
    },
    {
      icon: "fa fa-bullhorn",
      title: "ГАРАНТИЯ КАЧЕСТВА НА ВСЕ РАБОТЫ",
      text: "Мы даем гарантию на все работы выполненные нашими специалистами.",
    },
    {
      icon: "fa fa-group",
      title: "СПЕЦИАЛИСТЫ ПРОШЕДШИЕ ОБУЧЕНИЕ",
      text: "Специалисты прошли обучение на работе с оборудованием.",
    },
    {
      icon: "fa fa-wrench",
      title: "МНОГОЛЕТНИЙ ОПЫТ РАБОТЫ",
      text: "Наша компания на рынке много лет и не разу не дала в себе усомниться.",
    },
  ];
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div
          className="col-md-10 col-md-offset-1 section-title"
          style={{ marginBottom: 10 }}
        >
          <h2>Наши преимущества</h2>
        </div>
        <div className="row" style={{ marginBottom: 10 }}>
          {features.map((d, i) => (
            <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
              {" "}
              <i className={d.icon}></i>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
