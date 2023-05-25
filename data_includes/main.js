PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// First show instructions, then experiment trials, send results and show end screen
Sequence("consent_","instructions", "pretest", randomize("experiment"), SendResults(), "end")

// This is run at the beginning of each trial
Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global(),
    newVar("age").global()   ,
    newVar("motherlang").global(), 
    newVar("yearsrus").global() 
)
.log( "id" , getVar("ID") ) // Add the ID to all trials' results lines
.log( "age" , getVar("age") )
.log( "motherlang" , getVar("motherlang") )
.log( "yearsrus" , getVar("yearsrus") )

newTrial("consent_" ,
    defaultText.print(),
    newHtml("consent_", "consent_.html").print(),
    newButton("<p>Я согласен принять участие в исследовании.")
        .center()
        .print()
        .wait()
    )

// Instructions
newTrial("instructions",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newText("Здравствуйте!").css("margin-bottom","1em")
    ,
    newText("Сейчас вы будете читать предложения и отвечать на вопросы. Слова в предложении будут появляться одно за другим. Когда вы прочитали первое слово, НАЖМИТЕ ПРОБЕЛ, предыдущее слово исчезнет и появится следующее. Вернуться к предыдущему слову нельзя.").css("text-align","center")
    ,
    newText("Сначала прочитаете три тренировочных предложения. Они здесь, чтобы вы посмотрели, как работает программа.").css("margin","1em").css("text-align","center")
    ,
    newText("Вы готовы?").css("margin","1em")
    ,
    newText("Пожалуйста,напишите первую букву своего имени и фамилии").css("margin","1em")
    ,
    newTextInput("inputID", "")
        .lines(0)
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
     newText("Ваш возраст").css("text-align","center")
    ,
    newTextInput("inputage", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
     newText("Ваш родной язык").css("text-align","center")
    ,
    newTextInput("inputmotherlang", "")
        .lines(0)
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
     newText("Сколько лет вы учите русский язык?").css("text-align","center")
    ,
    newTextInput("input_yearsrus", "")
        .lines(0)
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
    newButton("Начать")
        .center()
        .print()
        // Only validate a click on Start when inputID has been filled
        .wait( getTextInput("inputID").testNot.text("") )
    ,
    // Store the text from inputID into the Var element
    getVar("ID").set( getTextInput("inputID") ),
    getVar("age").set( getTextInput("inputage") ),
    getVar("motherlang").set( getTextInput("inputmotherlang") ),
    getVar("yearsrus").set( getTextInput("input_yearsrus") ),
)

// how it works
Template("Test.csv", row =>
    newTrial( "pretest",
        newController("DashedSentence", {
            s: row.sentence
        })
            .print()
            .wait()
            .remove()
        ,
        newController("Question", {
            q: row.question,
            as: [row.correct, row.answer2],
            hasCorrect: true, // the first answer is correct
            randomOrder: true
        })
            .print()
            .log()
            .wait()
            .remove()
    )
)

Template("trial.csv", row =>
    newTrial( "experiment",
        newController("DashedSentence", {
            s: row.sentence
        })
            .print()
            .wait()
            .remove()
        ,
        newController("Question", {
            q: row.question,
            as: [row.correct, row.answer2],
            hasCorrect: true, // the first answer is correct
            randomOrder: true
        })
            .print()
            .log()
            .wait()
            .remove()
    )
)

// Final screen
newTrial("end",
    newText("Большое спасибо за участие! Если вы хотите узнать cвой результат, напишите нам на почту dakuzmicheva@edu.hse.ru")
        .center()
        .print()
    ,
    // This link a placeholder: replace it with a URL provided by your participant-pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
)
.setOption("countsForProgressBar",false)