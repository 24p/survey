A ----> survey questions import & data format

B ----> UI for editing survey (login etc)
 -- express + cookiejar + stupid login form
 -- basic idea of survey (id etc) -- list of surveys
  -- overview of sections
  -- ???
 -- add new section
 -- add new question
  -> select type
  -> based on type
   -> enter options
  -> enter title & name
  -> should be on new page?
   -> infer pages by iterating over questions and collecting all until question wants to be on individual page
 -- when typing in options & title: offer translations

C ----> basic user flow for questionnaire
 -- have static link for survey
 -- show "welcome page":
  -- language selection (just make up languages while building a PoC)
 -- fetches survey for language (i.e. /survey/13c3-21f3-4231-23112-223d2/en.json)
 -- render questionnaire
  -- respect logic of questions (A if B etc)
 -- when user clicks "save", actually commit survey answers from localStorage
