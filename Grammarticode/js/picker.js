import { collection, addDoc, getDocs, query, orderBy, limit, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { db } from "./firebase.js";

// quiz questions
const quizzes = {
    java: {
        easy: [
            { question: "What is the correct declaration of the main method in Java?", options: ["public static void main(String[] args)", "void main(String args[])", "main(String args[])", "public main(String[] args)"], answer: 0 },
            { question: "What is the output of: System.out.println(5/2)?", options: ["2.5", "2", "2.0", "Error"], answer: 1 },
            { question: "Which keyword is used to create an object?", options: ["new", "create", "make", "init"], answer: 0 },
            { question: "Which data type is used for whole numbers?", options: ["int", "double", "String", "char"], answer: 0 },
            { question: "Which symbol is used for comments?", options: ["//", "#", "<!-- -->", "--"], answer: 0 },
            { question: "Which class is used to print to the console?", options: ["System", "Console", "Print", "Output"], answer: 0 },
            { question: "What is the result of 10 % 3?", options: ["1", "3", "0", "10"], answer: 0 },
            { question: "Which keyword is used to declare a constant?", options: ["final", "static", "const", "lock"], answer: 0 },
            { question: "What is the data type of 'A'?", options: ["char", "String", "int", "boolean"], answer: 0 },
            { question: "Which operator is used for equality?", options: ["==", "=", "===", "equals"], answer: 0 },
            { question: "What is the default value of a boolean?", options: ["false", "true", "null", "0"], answer: 0 },
            { question: "What is the scope of a variable declared inside a method?", options: ["local", "global", "class", "package"], answer: 0 },
            { question: "Which keyword is used to create a subclass?", options: ["extends", "inherits", "super", "child"], answer: 0 },
            { question: "What is the purpose of the break statement?", options: ["stop the loop", "jump to next", "exit the program", "reset"], answer: 0 },
            { question: "Which is correct: Java is ___?", options: ["Object-Oriented", "Procedural only", "Assembly language", "Machine code"], answer: 0 }
        ],
        medium: [
            { question: "What is the default value of int in Java?", options: ["0", "null", "undefined", "error"], answer: 0 },
            { question: "Which keyword is related to polymorphism?", options: ["override", "super", "abstract", "interface"], answer: 0 },
            { question: "Which access modifier is the most restrictive?", options: ["private", "protected", "public", "default"], answer: 0 },
            { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Verified Module", "Joint Virtual Method", "Java Version Manager"], answer: 0 },
            { question: "What is the process of hiding implementation details called?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Overloading"], answer: 0 },
            { question: "Which method should be overridden for string representation?", options: ["toString()", "getString()", "valueOf()", "print()"], answer: 0 },
            { question: "What is the result of Integer.valueOf('123')?", options: ["Integer object", "123", "String", "Error"], answer: 0 },
            { question: "Which keyword is used for multiple inheritance of interfaces?", options: ["implements", "extends", "inherits", "uses"], answer: 0 },
            { question: "What is the default access modifier of class members?", options: ["package-private", "public", "private", "protected"], answer: 0 },
            { question: "Which collection allows duplicates?", options: ["ArrayList", "HashSet", "TreeSet", "LinkedHashSet"], answer: 0 },
            { question: "What is the result of 'abc'.charAt(1)?", options: ["b", "a", "c", "1"], answer: 0 },
            { question: "Which keyword is used for checked exceptions?", options: ["throws", "throw", "try", "catch"], answer: 0 },
            { question: "What is the size of char in Java?", options: ["2 bytes", "1 byte", "4 bytes", "8 bytes"], answer: 0 },
            { question: "Which method is used to compare strings?", options: ["equals()", "==", "compare()", "match()"], answer: 0 },
            { question: "What is the purpose of the static keyword?", options: ["belongs to class, not instance", "makes variable constant", "makes method private", "enables inheritance"], answer: 0 },
            { question: "Which loop is guaranteed to run at least once?", options: ["do-while", "while", "for", "enhanced for"], answer: 0 },
            { question: "What is the result of Math.ceil(4.3)?", options: ["5.0", "4.0", "4.3", "5"], answer: 0 },
            { question: "Which interface is used for sorting?", options: ["Comparable", "Comparator", "Sortable", "Ordered"], answer: 0 },
            { question: "What is the purpose of the super keyword?", options: ["refers to parent class", "makes class superior", "creates superclass", "enables polymorphism"], answer: 0 },
            { question: "Which method is used to get string length?", options: ["length()", "size()", "count()", "getLength()"], answer: 0 },
            { question: "What is the result of 'Hello'.substring(1,3)?", options: ["el", "ell", "He", "lo"], answer: 0 },
            { question: "Which keyword is used for abstract methods?", options: ["abstract", "virtual", "pure", "incomplete"], answer: 0 },
            { question: "What is the size of an int array int[5]?", options: ["5 elements", "4 elements", "6 elements", "depends"], answer: 0 },
            { question: "Which exception is for array index out of bounds?", options: ["ArrayIndexOutOfBoundsException", "IndexOutOfRangeException", "ArrayException", "BoundsException"], answer: 0 },
            { question: "What is the result of Boolean.parseBoolean('TRUE')?", options: ["true", "false", "TRUE", "Error"], answer: 0 }
        ],
        hard: [
            { question: "Which keyword is used for inheritance in Java?", options: ["extends", "implements", "inherit", "super"], answer: 0 },
            { question: "What is the difference between == and .equals()?", options: ["== compares reference, equals compares value", "They are the same", "equals is for numbers only", "== is for strings only"], answer: 0 },
            { question: "What is the output of Integer.parseInt('010')?", options: ["10", "8", "0", "Error"], answer: 0 },
            { question: "Which design pattern is used by the String class?", options: ["Immutable", "Singleton", "Factory", "Observer"], answer: 0 },
            { question: "What is the result of System.out.println('5' + 2)?", options: ["52", "7", "5 + 2", "Error"], answer: 0 },
            { question: "Which method is called when an object is garbage collected?", options: ["finalize()", "destroy()", "cleanup()", "dispose()"], answer: 0 },
            { question: "What is the maximum value of byte in Java?", options: ["127", "128", "255", "256"], answer: 0 },
            { question: "Which keyword is used for a non-static nested class?", options: ["inner", "nested", "private", "none"], answer: 3 },
            { question: "What is the result of 1.0/0.0 in Java?", options: ["Infinity", "Error", "NaN", "0"], answer: 0 },
            { question: "Which collection is thread-safe by default?", options: ["Vector", "ArrayList", "LinkedList", "HashMap"], answer: 0 },
            { question: "What is the purpose of the volatile keyword?", options: ["prevents caching", "makes variable constant", "enables inheritance", "optimizes performance"], answer: 0 },
            { question: "Which method is used to join threads?", options: ["join()", "wait()", "merge()", "combine()"], answer: 0 },
            { question: "What is the result of Character.isDigit('5')?", options: ["true", "false", "5", "Error"], answer: 0 },
            { question: "Which exception is for illegal thread operations?", options: ["IllegalThreadStateException", "ThreadException", "ConcurrencyException", "SynchronizationException"], answer: 0 },
            { question: "What is the size of long in Java?", options: ["8 bytes", "4 bytes", "2 bytes", "16 bytes"], answer: 0 },
            { question: "Which interface is for lambda expressions?", options: ["Functional Interface", "Lambda Interface", "Expression Interface", "Anonymous Interface"], answer: 0 },
            { question: "What is the result of Arrays.toString(new int[]{1,2,3})?", options: ["[1, 2, 3]", "{1, 2, 3}", "1,2,3", "Error"], answer: 0 },
            { question: "Which keyword is used for synchronization?", options: ["synchronized", "atomic", "concurrent", "parallel"], answer: 0 },
            { question: "What is the purpose of the transient keyword?", options: ["excludes from serialization", "makes temporary", "enables inheritance", "optimizes memory"], answer: 0 },
            { question: "Which method is used to get the current thread?", options: ["Thread.currentThread()", "Thread.getThread()", "Thread.this()", "Thread.active()"], answer: 0 },
            { question: "What is the result of Math.round(4.6)?", options: ["5", "4", "4.6", "5.0"], answer: 0 },
            { question: "Which collection is used for LIFO operations?", options: ["Stack", "Queue", "List", "Set"], answer: 0 },
            { question: "What is the purpose of the assert keyword?", options: ["debugging and testing", "error handling", "type checking", "optimization"], answer: 0 },
            { question: "Which method is used for deep copying?", options: ["clone()", "copy()", "duplicate()", "replicate()"], answer: 0 },
            { question: "What is the result of String.valueOf(null)?", options: ["'null'", "null", "Error", "empty string"], answer: 0 },
            { question: "Which keyword is used for enum declaration?", options: ["enum", "enumeration", "constant", "final"], answer: 0 },
            { question: "What is the purpose of the strictfp keyword?", options: ["strict floating point", "strict final point", "string format print", "static final private"], answer: 0 },
            { question: "Which method is used for string formatting?", options: ["String.format()", "String.printf()", "String.template()", "String.substitute()"], answer: 0 },
            { question: "What is the result of Integer.MAX_VALUE + 1?", options: ["Integer.MIN_VALUE", "Error", "Infinity", "MAX_VALUE"], answer: 0 },
            { question: "Which design pattern is used for object creation?", options: ["Factory", "Observer", "Strategy", "Command"], answer: 0 },
            { question: "What is the purpose of WeakReference?", options: ["allows garbage collection", "makes reference strong", "optimizes memory", "enables inheritance"], answer: 0 },
            { question: "Which method is used for concurrent operations?", options: ["synchronize", "lock", "atomic", "concurrent"], answer: 1 },
            { question: "What is the result of Collections.emptyList().add(1)?", options: ["UnsupportedOperationException", "true", "false", "Error"], answer: 0 },
            { question: "Which annotation is used for deprecated methods?", options: ["@Deprecated", "@Old", "@Obsolete", "@Legacy"], answer: 0 },
            { question: "What is the purpose of the Reflection API?", options: ["runtime inspection", "compile-time checking", "performance optimization", "memory management"], answer: 0 },
            { question: "Which method is used for stream operations?", options: ["stream()", "flow()", "iterate()", "process()"], answer: 0 },
            { question: "What is the result of Optional.empty().orElse('default')?", options: ["'default'", "empty", "null", "Error"], answer: 0 },
            { question: "Which keyword is used for the module system?", options: ["module", "package", "namespace", "library"], answer: 0 },
            { question: "What is the purpose of CompletableFuture?", options: ["asynchronous programming", "thread synchronization", "memory optimization", "error handling"], answer: 0 },
            { question: "Which operator is used for method references?", options: ["::", "->", "=>", "::>"], answer: 0 }
        ],
        impossible: [
            { question: "public ___ class Test { }", options: ["class", "interface", "enum", "record"], answer: 0 },
            { question: "int[] arr = new int[___];", options: ["5", "arr", "int", "len"], answer: 0 },
            { question: "for(int i=0; i<10; i___) { }", options: ["++", "+=", "--", "+1"], answer: 0 },
            { question: "if(str.___(\"abc\")) { }", options: ["equals", "==", "compare", "eq"], answer: 0 },
            { question: "System.out.___(\"Hi\");", options: ["println", "print", "printf", "write"], answer: 0 },
            { question: "try { } ___ (Exception e) { }", options: ["catch", "finally", "throw", "throws"], answer: 0 },
            { question: "List<String> list = new ArrayList___();", options: ["<>", "()", "{}", "[]"], answer: 0 },
            { question: "switch(x) { ___ 1: break; }", options: ["case", "if", "when", "switch"], answer: 0 },
            { question: "class A ___ B { }", options: ["extends", "implements", "import", "package"], answer: 0 },
            { question: "int x = ___(5.9);", options: ["(int)", "Integer", "cast", "parseInt"], answer: 0 },
            { question: "___(x > 0);", options: ["assert", "check", "verify", "if"], answer: 0 },
            { question: "Optional<String> o = Optional.___(\"hi\");", options: ["of", "get", "empty", "map"], answer: 0 },
            { question: "int sum = IntStream.range(1,10).___();", options: ["sum", "reduce", "collect", "count"], answer: 0 },
            { question: "Thread t = new Thread(___);", options: ["runnable", "run", "Runnable", "Thread"], answer: 2 },
            { question: "Path p = Paths.___(\"file.txt\");", options: ["get", "path", "open", "of"], answer: 0 },
            { question: "var list = List.___Of(\"a\", \"b\");", options: ["of", "list", "create", "asList"], answer: 0 },
            { question: "Map<K,V> map = new HashMap___();", options: ["<>", "()", "{}", "[]"], answer: 0 },
            { question: "record Point(int x, int y) ___;", options: ["{}", "();", "[]", ";"], answer: 3 },
            { question: "sealed class A ___ permits B,C { }", options: ["permits", "allows", "extends", "implements"], answer: 0 },
            { question: "CompletableFuture.runAsync(___);", options: ["() -> {}", "Runnable", "new Thread()", "task()"], answer: 0 },
            { question: "enum Day { MON, TUE, ___ }", options: ["WED", "FRI", "DAY", "END"], answer: 0 },
            { question: "String s = String.___(10);", options: ["valueOf", "copyValueOf", "format", "repeat"], answer: 1 },
            { question: "Integer i = Integer.___(\"42\");", options: ["parseInt", "valueOf", "decode", "get"], answer: 1 },
            { question: "Files.___(path);", options: ["exists", "delete", "readAllBytes", "write"], answer: 0 },
            { question: "Arrays.___(arr);", options: ["sort", "order", "arrange", "stream"], answer: 0 },
            { question: "Collections.___(list);", options: ["sort", "stream", "copy", "emptyList"], answer: 0 },
            { question: "LocalDate d = LocalDate.___();", options: ["now", "of", "parse", "today"], answer: 0 },
            { question: "StringBuilder sb = new StringBuilder().___(\"a\");", options: ["append", "add", "push", "put"], answer: 0 },
            { question: "Queue<String> q = new LinkedList<>(); q.___(\"x\");", options: ["add", "push", "offer", "enqueue"], answer: 0 },
            { question: "Stack<Integer> s = new Stack<>(); s.___(1);", options: ["push", "add", "offer", "insert"], answer: 0 },
            { question: "double r = Math.___(16);", options: ["sqrt", "pow", "abs", "round"], answer: 0 },
            { question: "long t = System.___();", options: ["currentTimeMillis", "nanoTime", "time", "clock"], answer: 0 },
            { question: "ExecutorService ex = Executors.___();", options: ["newFixedThreadPool", "newPool", "create", "builder"], answer: 0 },
            { question: "Scanner sc = new Scanner(System.___);", options: ["in", "out", "err", "console"], answer: 0 },
            { question: "URL url = new URL(\"http://x\"); url.open___();", options: ["Connection", "Stream", "Connect", "Socket"], answer: 0 },
            { question: "Random r = new Random(); r.___();", options: ["nextInt", "random", "gen", "rand"], answer: 0 },
            { question: "String s = s.___();", options: ["trim", "cut", "clear", "remove"], answer: 0 },
            { question: "Deque<Integer> d = new ArrayDeque<>(); d.___(1);", options: ["add", "offer", "push", "enqueue"], answer: 2 },
            { question: "Predicate<String> p = s -> s.___(\"a\");", options: ["contains", "has", "includes", "match"], answer: 0 },
            { question: "Function<Integer,String> f = String::___;", options: ["valueOf", "toString", "format", "copy"], answer: 0 },
            { question: "Stream.of(1,2,3).___(System.out::println);", options: ["forEach", "map", "peek", "print"], answer: 0 },
            { question: "Files.readString(Path.of(\"a.txt\"), StandardCharsets.___);", options: ["UTF_8", "ASCII", "UTF_16", "DEFAULT"], answer: 0 },
            { question: "String.format(\"%d\", ___);", options: ["10", "String", "\"10\"", "Integer"], answer: 0 },
            { question: "try(FileReader fr = new FileReader(\"a.txt\")) { ___ }", options: ["}", "{", "finally", "catch"], answer: 0 },
            { question: "s.___().forEach(System.out::println);", options: ["stream", "list", "map", "set"], answer: 0 },
            { question: "Class<?> c = String.___;", options: ["class", "Class", "TYPE", "C"], answer: 0 },
            { question: "double d = BigDecimal.ONE.___();", options: ["doubleValue", "toDouble", "asDouble", "parseDouble"], answer: 0 },
            { question: "Arrays.___(new int[]{1,2,3});", options: ["stream", "list", "set", "copy"], answer: 0 },
            { question: "Path p = Files.___(\"a.txt\");", options: ["createFile", "make", "touch", "open"], answer: 0 },
            { question: "Thread.sleep(___);", options: ["1000", "1s", "one", "millis"], answer: 0 },
            { question: "Socket s = new Socket(\"localhost\", ___);", options: ["8080", "80", "21", "22"], answer: 0 },
            { question: "HttpClient c = HttpClient.___();", options: ["newHttpClient", "create", "builder", "open"], answer: 0 },
            { question: "CompletableFuture.supplyAsync(() -> \"hi\").___();", options: ["join", "get", "wait", "block"], answer: 0 },
            { question: "Stream.iterate(0, n -> n+1).___(10);", options: ["limit", "take", "count", "size"], answer: 0 },
            { question: "Map.Entry<K,V> e : map.___()", options: ["entrySet", "keySet", "values", "entries"], answer: 0 },
            { question: "Path p = Paths.get(\"a\"); Files.___(p);", options: ["delete", "remove", "erase", "drop"], answer: 0 },
            { question: "UUID id = UUID.___();", options: ["randomUUID", "create", "gen", "of"], answer: 0 },
            { question: "Pattern p = Pattern.___(\"a.*\");", options: ["compile", "of", "regex", "match"], answer: 0 },
            { question: "Matcher m = p.___(\"abc\");", options: ["matcher", "match", "test", "find"], answer: 0 },
            { question: "boolean b = m.___();", options: ["find", "next", "has", "search"], answer: 0 },
            { question: "Stream.of(\"a\",\"b\").map(String::___);", options: ["toUpperCase", "upper", "capitalize", "format"], answer: 0 },
            { question: "char c = Character.___('a');", options: ["toUpperCase", "upper", "capitalize", "format"], answer: 0 }
        ]

    },

    html: {
        easy: [
            { question: "Which tag is used for the largest heading?", options: ["<h6>", "<h1>", "<head>", "<heading>"], answer: 1 },
            { question: "Which tag is used for a paragraph?", options: ["<p>", "<para>", "<pg>", "<text>"], answer: 0 },
            { question: "Which tag is used for a line break?", options: ["<br>", "<lb>", "<break>", "<line>"], answer: 0 },
            { question: "Which tag is used for an image?", options: ["<img>", "<image>", "<pic>", "<src>"], answer: 0 },
            { question: "Which attribute is used for image alt text?", options: ["alt", "title", "src", "desc"], answer: 0 },
            { question: "Which tag is used for an unordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: 1 },
            { question: "Which tag is used for a table row?", options: ["<tr>", "<td>", "<th>", "<row>"], answer: 0 },
            { question: "Which tag is used for a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
            { question: "Which tag is used for a dropdown?", options: ["<select>", "<option>", "<dropdown>", "<choice>"], answer: 0 },
            { question: "Which tag is used for bold text?", options: ["<b>", "<strong>", "<bold>", "Both <b> and <strong>"], answer: 3 },
            { question: "Which tag is used for italic text?", options: ["<i>", "<italic>", "<em>", "Both <i> and <em>"], answer: 3 },
            { question: "Which attribute is used for link destination?", options: ["href", "src", "link", "url"], answer: 0 },
            { question: "Which tag is used for a horizontal rule?", options: ["<hr>", "<line>", "<rule>", "<horizontal>"], answer: 0 },
            { question: "Which tag is used for a form?", options: ["<form>", "<input>", "<submit>", "<field>"], answer: 0 },
            { question: "Which tag is used for a table?", options: ["<table>", "<tbl>", "<grid>", "<data>"], answer: 0 }
        ],
        medium: [
            { question: "Which tag is used to add a link?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
            { question: "Which attribute is used for an image source?", options: ["src", "href", "link", "alt"], answer: 0 },
            { question: "What is the correct DOCTYPE for HTML5?", options: ["<!DOCTYPE html>", "<!HTML5>", "<doctype>", "<html5>"], answer: 0 },
            { question: "Which is a self-closing tag?", options: ["<img>", "<p>", "<div>", "<h1>"], answer: 0 },
            { question: "Which tag is used for audio?", options: ["<audio>", "<sound>", "<music>", "<mp3>"], answer: 0 },
            { question: "Which tag is used for video?", options: ["<video>", "<movie>", "<media>", "<clip>"], answer: 0 },
            { question: "Which attribute is used for input type?", options: ["type", "kind", "mode", "format"], answer: 0 },
            { question: "Which tag is used for a table header?", options: ["<th>", "<thead>", "<header>", "<top>"], answer: 0 },
            { question: "Which tag is used for a canvas?", options: ["<canvas>", "<draw>", "<graphics>", "<paint>"], answer: 0 },
            { question: "Which attribute is used for the target window?", options: ["target", "window", "open", "destination"], answer: 0 },
            { question: "Which tag is used for scripts?", options: ["<script>", "<js>", "<javascript>", "<code>"], answer: 0 },
            { question: "Which tag is used for styles?", options: ["<style>", "<css>", "<styling>", "<format>"], answer: 0 },
            { question: "Which attribute is used for a CSS class?", options: ["class", "className", "style", "css"], answer: 0 },
            { question: "Which tag is used for an ordered list?", options: ["<ol>", "<ul>", "<list>", "<order>"], answer: 0 },
            { question: "Which tag is used for a list item?", options: ["<li>", "<item>", "<list>", "<element>"], answer: 0 },
            { question: "Which tag is used for a division?", options: ["<div>", "<section>", "<block>", "<container>"], answer: 0 },
            { question: "Which tag is used for a span?", options: ["<span>", "<inline>", "<text>", "<phrase>"], answer: 0 },
            { question: "Which attribute is used for a unique identifier?", options: ["id", "name", "identifier", "uid"], answer: 0 },
            { question: "Which tag is used for a textarea?", options: ["<textarea>", "<textbox>", "<multiline>", "<text>"], answer: 0 },
            { question: "Which tag is used for a button?", options: ["<button>", "<btn>", "<click>", "<submit>"], answer: 0 },
            { question: "Which attribute is used for image width?", options: ["width", "size", "w", "dimension"], answer: 0 },
            { question: "Which attribute is used for image height?", options: ["height", "h", "size", "dimension"], answer: 0 },
            { question: "Which tag is used for table data?", options: ["<td>", "<data>", "<cell>", "<column>"], answer: 0 },
            { question: "Which tag is used for the table body?", options: ["<tbody>", "<body>", "<content>", "<data>"], answer: 0 },
            { question: "Which tag is used for the table footer?", options: ["<tfoot>", "<footer>", "<bottom>", "<end>"], answer: 0 }
        ],
        hard: [
            { question: "Which is NOT a valid HTML5 element?", options: ["<section>", "<article>", "<nav>", "<container>"], answer: 3 },
            { question: "What is the default value of the position property?", options: ["static", "relative", "absolute", "fixed"], answer: 0 },
            { question: "Which tag is used for a semantic footer?", options: ["<footer>", "<bottom>", "<end>", "<div id='footer'>"], answer: 0 },
            { question: "Which HTML5 input type is used for email?", options: ["email", "mail", "e-mail", "address"], answer: 0 },
            { question: "What is the purpose of data-* attributes?", options: ["custom data storage", "database connection", "data validation", "data binding"], answer: 0 },
            { question: "Which tag is used for a semantic header?", options: ["<header>", "<head>", "<top>", "<banner>"], answer: 0 },
            { question: "What is the role of aria-label?", options: ["accessibility description", "label styling", "form validation", "data labeling"], answer: 0 },
            { question: "Which attribute is used for content security policy?", options: ["nonce", "security", "policy", "csp"], answer: 0 },
            { question: "What is the purpose of semantic HTML?", options: ["better accessibility and SEO", "faster loading", "smaller file size", "better styling"], answer: 0 },
            { question: "Which tag is used for a progress indicator?", options: ["<progress>", "<meter>", "<loading>", "<indicator>"], answer: 0 },
            { question: "What is the difference between <article> and <section>?", options: ["article is standalone content", "section is standalone content", "no difference", "depends on content"], answer: 0 },
            { question: "Which attribute is used for form validation?", options: ["required", "validate", "check", "verify"], answer: 0 },
            { question: "What is the purpose of the <time> element?", options: ["semantic time representation", "time formatting", "timezone conversion", "time calculation"], answer: 0 },
            { question: "Which attribute is used for input pattern?", options: ["pattern", "regex", "format", "validation"], answer: 0 },
            { question: "What is the role of the <main> element?", options: ["primary content area", "main navigation", "main header", "main footer"], answer: 0 },
            { question: "Which attribute is used for lazy loading?", options: ["loading", "lazy", "defer", "async"], answer: 0 },
            { question: "What is the purpose of the <details> element?", options: ["collapsible content", "detailed information", "metadata", "specifications"], answer: 0 },
            { question: "Which attribute is used for input autocomplete?", options: ["autocomplete", "autofill", "suggest", "complete"], answer: 0 },
            { question: "What is the role of the <aside> element?", options: ["sidebar content", "additional information", "related content", "all of the above"], answer: 3 },
            { question: "Which attribute is used for responsive images?", options: ["srcset", "responsive", "sizes", "both srcset and sizes"], answer: 3 },
            { question: "What is the purpose of the <picture> element?", options: ["responsive images", "image gallery", "picture frame", "image metadata"], answer: 0 },
            { question: "Which attribute is used for cross-origin requests?", options: ["crossorigin", "cors", "origin", "cross"], answer: 0 },
            { question: "What is the role of the <figure> element?", options: ["self-contained content", "mathematical figures", "chart data", "image container"], answer: 0 },
            { question: "Which attribute is used for input step?", options: ["step", "increment", "interval", "jump"], answer: 0 },
            { question: "What is the purpose of the <mark> element?", options: ["highlighted text", "marked content", "important text", "selected text"], answer: 0 },
            { question: "Which attribute is used for contenteditable elements?", options: ["contenteditable", "editable", "edit", "modify"], answer: 0 },
            { question: "What is the role of the <summary> element?", options: ["details summary", "content summary", "page summary", "article summary"], answer: 0 },
            { question: "Which attribute is used for drag and drop?", options: ["draggable", "drag", "drop", "move"], answer: 0 },
            { question: "What is the purpose of the <template> element?", options: ["reusable content template", "page template", "style template", "layout template"], answer: 0 },
            { question: "Which attribute is used for input multiple?", options: ["multiple", "multi", "many", "several"], answer: 0 },
            { question: "What is the role of the <output> element?", options: ["calculation result", "program output", "display output", "form output"], answer: 0 },
            { question: "Which attribute is used for hidden elements?", options: ["hidden", "hide", "invisible", "display"], answer: 0 },
            { question: "What is the purpose of the <datalist> element?", options: ["input suggestions", "data table", "data list", "database list"], answer: 0 },
            { question: "Which attributes are used for input min/max?", options: ["min and max", "range", "limit", "bounds"], answer: 0 },
            { question: "What is the role of the <wbr> element?", options: ["word break opportunity", "word boundary", "line break", "word wrap"], answer: 0 },
            { question: "Which attribute is used for spellcheck?", options: ["spellcheck", "spell", "check", "grammar"], answer: 0 },
            { question: "What is the purpose of the <kbd> element?", options: ["keyboard input", "key binding", "keyboard shortcut", "key display"], answer: 0 },
            { question: "Which attribute is used for translate?", options: ["translate", "translation", "lang", "locale"], answer: 0 },
            { question: "What is the role of the <samp> element?", options: ["sample output", "sample data", "sample code", "sample text"], answer: 0 },
            { question: "Which attribute is used for element direction?", options: ["dir", "direction", "orientation", "flow"], answer: 0 }
        ],
        impossible: [
            { question: "<span style='____: red;'>Text</span>", options: ["color", "background", "font", "display"], answer: 0 },
            { question: "<html><head><____>Title</____></head></html>", options: ["title", "meta", "link", "style"], answer: 0 },
            { question: "<img src='image.png' ____='description'>", options: ["alt", "title", "id", "name"], answer: 0 },
            { question: "<a ____='https://example.com'>Link</a>", options: ["href", "src", "link", "action"], answer: 0 },
            { question: "<table><tr><____>Data</____></tr></table>", options: ["td", "th", "tr", "caption"], answer: 0 },
            { question: "<form ____='/submit'>", options: ["action", "method", "href", "src"], answer: 0 },
            { question: "<input type='text' ____='username'>", options: ["name", "id", "class", "for"], answer: 0 },
            { question: "<label ____='username'>User:</label>", options: ["for", "id", "name", "class"], answer: 0 },
            { question: "<link rel='stylesheet' ____='style.css'>", options: ["href", "src", "link", "url"], answer: 0 },
            { question: "<script ____='app.js'></script>", options: ["src", "href", "link", "rel"], answer: 0 },
            { question: "<div ____='container'>Content</div>", options: ["class", "id", "name", "for"], answer: 0 },
            { question: "<p ____='paragraph'>Hello</p>", options: ["id", "class", "style", "name"], answer: 0 },
            { question: "<input type='____'>", options: ["text", "button", "submit", "checkbox"], answer: 0 },
            { question: "<ol><____>Item</____></ol>", options: ["li", "ul", "ol", "dd"], answer: 0 },
            { question: "<ul><____>Item</____></ul>", options: ["li", "ol", "ul", "dt"], answer: 0 },
            { question: "<head><____ charset='UTF-8'></head>", options: ["meta", "link", "style", "title"], answer: 0 },
            { question: "<body ____='background: blue;'>", options: ["style", "class", "id", "name"], answer: 0 },
            { question: "<h1 ____='main-title'>Heading</h1>", options: ["id", "class", "style", "name"], answer: 0 },
            { question: "<iframe ____='page.html'></iframe>", options: ["src", "href", "link", "action"], answer: 0 },
            { question: "<audio ____='song.mp3'></audio>", options: ["src", "href", "sound", "file"], answer: 0 },
            { question: "<video ____='movie.mp4'></video>", options: ["src", "href", "file", "data"], answer: 0 },
            { question: "<source ____='track.mp3'>", options: ["src", "href", "file", "path"], answer: 0 },
            { question: "<track ____='subtitles.vtt'>", options: ["src", "href", "file", "link"], answer: 0 },
            { question: "<button ____='submit'>Click</button>", options: ["type", "name", "id", "value"], answer: 0 },
            { question: "<form action='page.php' ____='post'>", options: ["method", "type", "send", "target"], answer: 0 },
            { question: "<input type='checkbox' ____>", options: ["checked", "selected", "disabled", "readonly"], answer: 0 },
            { question: "<input type='text' ____>", options: ["required", "checked", "hidden", "multiple"], answer: 0 },
            { question: "<input type='text' ____>", options: ["disabled", "readonly", "hidden", "multiple"], answer: 0 },
            { question: "<select><option ____>Choice</option></select>", options: ["selected", "checked", "active", "chosen"], answer: 0 },
            { question: "<img src='img.png' ____='100'>", options: ["width", "height", "size", "length"], answer: 0 },
            { question: "<img src='img.png' ____='200'>", options: ["height", "width", "size", "length"], answer: 0 },
            { question: "<table><____><tr><td>Cell</td></tr></____></table>", options: ["tbody", "thead", "tfoot", "caption"], answer: 0 },
            { question: "<table><____><td>Head</td></____></table>", options: ["tr", "thead", "tbody", "tfoot"], answer: 0 },
            { question: "<table><tr><____>Head</____></tr></table>", options: ["th", "td", "tr", "caption"], answer: 0 },
            { question: "<form><input type='text' ____='off'></form>", options: ["autocomplete", "autofocus", "readonly", "disabled"], answer: 0 },
            { question: "<input type='text' ____>", options: ["autofocus", "checked", "multiple", "hidden"], answer: 0 },
            { question: "<form><input type='file' ____></form>", options: ["multiple", "checked", "readonly", "disabled"], answer: 0 },
            { question: "<form ____>", options: ["novalidate", "autocomplete", "disabled", "readonly"], answer: 0 },
            { question: "<img src='img.png' ____='Image'>", options: ["alt", "title", "id", "name"], answer: 0 },
            { question: "<abbr ____='World Health Organization'>WHO</abbr>", options: ["title", "alt", "name", "id"], answer: 0 },
            { question: "<blockquote ____='author'>Quote</blockquote>", options: ["cite", "src", "href", "rel"], answer: 0 },
            { question: "<q ____='author'>Text</q>", options: ["cite", "src", "href", "rel"], answer: 0 },
            { question: "<ol ____='1'>", options: ["start", "value", "order", "index"], answer: 0 },
            { question: "<ol ____='A'>", options: ["type", "style", "class", "order"], answer: 0 },
            { question: "<li ____='3'>Item</li>", options: ["value", "index", "order", "num"], answer: 0 },
            { question: "<form><button ____='button'>Click</button></form>", options: ["type", "method", "action", "role"], answer: 0 },
            { question: "<form><input type='submit' ____='Save'></form>", options: ["value", "name", "id", "class"], answer: 0 },
            { question: "<progress ____='50' max='100'></progress>", options: ["value", "level", "data", "percent"], answer: 0 },
            { question: "<meter ____='0.5'></meter>", options: ["value", "min", "max", "data"], answer: 0 },
            { question: "<details><____>Info</____></details>", options: ["summary", "caption", "title", "header"], answer: 0 },
            { question: "<input type='number' min='1' ____='5'>", options: ["max", "step", "value", "size"], answer: 0 },
            { question: "<input type='number' min='1' max='10' ____='2'>", options: ["step", "size", "value", "interval"], answer: 0 },
            { question: "<textarea ____='4'></textarea>", options: ["rows", "cols", "size", "height"], answer: 0 },
            { question: "<textarea rows='4' ____='30'></textarea>", options: ["cols", "size", "width", "length"], answer: 0 },
            { question: "<iframe ____='0'></iframe>", options: ["frameborder", "border", "margin", "padding"], answer: 0 },
            { question: "<iframe ____='no'></iframe>", options: ["scrolling", "scroll", "overflow", "overflow-y"], answer: 0 },
            { question: "<div ____='tooltip'>Hover me</div>", options: ["title", "alt", "data", "name"], answer: 0 },
            { question: "<embed ____='file.swf'>", options: ["src", "href", "data", "link"], answer: 0 },
            { question: "<object ____='file.swf'></object>", options: ["data", "src", "href", "file"], answer: 0 },
            { question: "<canvas ____='myCanvas'></canvas>", options: ["id", "class", "name", "for"], answer: 0 },
            { question: "<svg ____='0 0 100 100'></svg>", options: ["viewBox", "width", "height", "xmlns"], answer: 0 }
        ]
},
    python: {
        easy: [
            { question: "What is the output of: print(2**3)?", options: ["6", "8", "9", "Error"], answer: 1 },
            { question: "Which keyword is used to print?", options: ["print", "echo", "output", "say"], answer: 0 },
            { question: "What is the symbol for a comment?", options: ["#", "//", "<!-- -->", "--"], answer: 0 },
            { question: "What is the data type of 'Hello'?", options: ["str", "string", "text", "char"], answer: 0 },
            { question: "What is the result of len('Python')?", options: ["5", "6", "7", "Error"], answer: 1 },
            { question: "Which operator is used for floor division?", options: ["//", "/", "%", "**"], answer: 0 },
            { question: "What is the result of 10 % 3?", options: ["1", "3", "0", "10"], answer: 0 },
            { question: "Which keyword is used for condition?", options: ["if", "when", "check", "condition"], answer: 0 },
            { question: "Which keyword is used for loop?", options: ["for", "loop", "repeat", "iterate"], answer: 0 },
            { question: "Which function is used for user input?", options: ["input", "read", "get", "scan"], answer: 0 },
            { question: "What is the result of type(5)?", options: ["<class 'int'>", "int", "integer", "number"], answer: 0 },
            { question: "Which symbol is used for string concatenation?", options: ["+", "&", ".", "concat"], answer: 0 },
            { question: "Which keyword is used for defining a function?", options: ["def", "function", "func", "define"], answer: 0 },
            { question: "What is the standard indentation in Python?", options: ["4 spaces", "2 spaces", "1 tab", "8 spaces"], answer: 0 },
            { question: "What is the result of bool(0)?", options: ["False", "True", "0", "Error"], answer: 0 }
        ],
        medium: [
            { question: "What is the data type of: {1,2,3}?", options: ["list", "set", "dict", "tuple"], answer: 1 },
            { question: "What is the result of: len('hello')?", options: ["4", "5", "6", "error"], answer: 1 },
            { question: "Which method is used to append to a list?", options: ["append", "add", "insert", "push"], answer: 0 },
            { question: "What is the result of [1,2,3][1]?", options: ["1", "2", "3", "Error"], answer: 1 },
            { question: "Which keyword is used for exception handling?", options: ["try", "catch", "handle", "error"], answer: 0 },
            { question: "What is the result of range(3)?", options: ["range(0, 3)", "[0,1,2]", "0,1,2", "3"], answer: 0 },
            { question: "Which method is used for string splitting?", options: ["split", "divide", "separate", "break"], answer: 0 },
            { question: "What is the result of 'abc'.upper()?", options: ["ABC", "abc", "Abc", "Error"], answer: 0 },
            { question: "Which function is used for absolute value?", options: ["abs", "absolute", "fabs", "magnitude"], answer: 0 },
            { question: "What is the result of list(range(1,4))?", options: ["[1,2,3]", "[1,2,3,4]", "[0,1,2,3]", "Error"], answer: 0 },
            { question: "Which keyword is used for class definition?", options: ["class", "object", "struct", "type"], answer: 0 },
            { question: "What is the result of max([1,3,2])?", options: ["3", "1", "2", "Error"], answer: 0 },
            { question: "Which method is used for dictionary keys?", options: ["keys", "getkeys", "keylist", "allkeys"], answer: 0 },
            { question: "What is the result of 'hello'[:3]?", options: ["hel", "hell", "ell", "lo"], answer: 0 },
            { question: "Which function is used for string to integer?", options: ["int", "integer", "toint", "parse"], answer: 0 },
            { question: "What is the result of [1,2] + [3,4]?", options: ["[1,2,3,4]", "[4,6]", "Error", "[1,2,[3,4]]"], answer: 0 },
            { question: "Which keyword is used for lambda function?", options: ["lambda", "anonymous", "func", "=>"], answer: 0 },
            { question: "What is the result of sorted([3,1,2])?", options: ["[1,2,3]", "[3,2,1]", "[3,1,2]", "Error"], answer: 0 },
            { question: "Which method is used to reverse a list?", options: ["reverse", "reversed", "backwards", "flip"], answer: 0 },
            { question: "What is the result of enumerate(['a','b'])?", options: ["enumerate object", "[(0,'a'),(1,'b')]", "[0,1]", "Error"], answer: 0 },
            { question: "Which function is used for zip operation?", options: ["zip", "combine", "merge", "pair"], answer: 0 },
            { question: "What is the result of any([False, True, False])?", options: ["True", "False", "Error", "None"], answer: 0 },
            { question: "Which method is used for string join?", options: ["join", "combine", "concat", "merge"], answer: 0 },
            { question: "What is the result of all([True, True, False])?", options: ["False", "True", "Error", "None"], answer: 0 },
            { question: "Which function is used for filter operation?", options: ["filter", "select", "choose", "pick"], answer: 0 }
        ],
        hard: [
            { question: "Which keyword is used to create a generator?", options: ["return", "yield", "generate", "func"], answer: 1 },
            { question: "What is the output of: list(range(0,10,3))?", options: ["[0,3,6,9]", "[0,3,6]", "[3,6,9]", "Error"], answer: 0 },
            { question: "What is the result of *args in a function?", options: ["variable arguments", "pointer", "multiplication", "Error"], answer: 0 },
            { question: "Which decorator is used for static methods?", options: ["@staticmethod", "@static", "@classmethod", "@method"], answer: 0 },
            { question: "What is the result of list comprehension [x**2 for x in range(3)]?", options: ["[0,1,4]", "[1,4,9]", "[0,1,2]", "Error"], answer: 0 },
            { question: "Which keyword is used for context manager?", options: ["with", "using", "context", "manager"], answer: 0 },
            { question: "What is the result of next(iter([1,2,3]))?", options: ["1", "2", "3", "Error"], answer: 0 },
            { question: "Which method is used for dictionary get with default?", options: ["get", "getdefault", "default", "fetch"], answer: 0 },
            { question: "What is the result of isinstance(5, int)?", options: ["True", "False", "int", "Error"], answer: 0 },
            { question: "Which keyword is used for multiple inheritance?", options: ["class Child(Parent1, Parent2)", "extends", "inherits", "implements"], answer: 0 },
            { question: "What is the result of hasattr(obj, 'attr')?", options: ["Boolean", "String", "Object", "Error"], answer: 0 },
            { question: "Which function is used to get object id?", options: ["id", "identity", "address", "ref"], answer: 0 },
            { question: "What is the result of callable(function)?", options: ["Boolean", "Function", "Object", "Error"], answer: 0 },
            { question: "Which method is used for string formatting?", options: ["format", "printf", "sprintf", "template"], answer: 0 },
            { question: "What is the result of vars() function?", options: ["local variables dict", "global variables", "all variables", "Error"], answer: 0 },
            { question: "Which keyword is used for assertion?", options: ["assert", "check", "verify", "test"], answer: 0 },
            { question: "What is the result of globals() function?", options: ["global namespace dict", "local namespace", "all globals", "Error"], answer: 0 },
            { question: "Which function is used for memory address?", options: ["id", "address", "memory", "location"], answer: 0 },
            { question: "What is the result of exec() function?", options: ["executes code", "returns result", "compiles code", "Error"], answer: 0 },
            { question: "Which function is used for code evaluation?", options: ["eval", "execute", "run", "calc"], answer: 0 },
            { question: "What is the result of compile() function?", options: ["code object", "bytecode", "executable", "Error"], answer: 0 },
            { question: "Which method is used for object serialization?", options: ["pickle", "serialize", "marshal", "json"], answer: 0 },
            { question: "What is the result of property decorator?", options: ["getter/setter", "class property", "instance property", "Error"], answer: 0 },
            { question: "Which keyword is used for metaclass?", options: ["metaclass", "meta", "class", "type"], answer: 0 },
            { question: "What is the result of __slots__ attribute?", options: ["memory optimization", "attribute control", "performance boost", "all of the above"], answer: 3 },
            { question: "Which function is used for dynamic import?", options: ["__import__", "import", "load", "require"], answer: 0 },
            { question: "What is the result of weakref module?", options: ["weak references", "reference counting", "garbage collection", "Error"], answer: 0 },
            { question: "Which keyword is used for coroutine?", options: ["async", "coroutine", "await", "concurrent"], answer: 0 },
            { question: "What is the result of await keyword?", options: ["pauses execution", "resumes execution", "creates task", "Error"], answer: 0 },
            { question: "Which function is used for task creation?", options: ["asyncio.create_task", "asyncio.task", "asyncio.run", "asyncio.start"], answer: 0 },
            { question: "What is the result of concurrent.futures module?", options: ["parallel execution", "sequential execution", "async execution", "Error"], answer: 0 },
            { question: "Which method is used for thread pool?", options: ["ThreadPoolExecutor", "ThreadPool", "Pool", "Executor"], answer: 0 },
            { question: "What is the result of multiprocessing module?", options: ["process-based parallelism", "thread-based parallelism", "async parallelism", "Error"], answer: 0 },
            { question: "Which function is used for process creation?", options: ["Process", "Thread", "Task", "Worker"], answer: 0 },
            { question: "What is the result of queue module?", options: ["thread-safe queues", "async queues", "priority queues", "all of the above"], answer: 3 },
            { question: "Which method is used for resource sharing?", options: ["Manager", "Share", "Sync", "Lock"], answer: 0 },
            { question: "What is the result of threading.Lock()?", options: ["mutual exclusion", "thread creation", "thread joining", "Error"], answer: 0 },
            { question: "Which keyword is used for GIL handling?", options: ["no specific keyword", "gil", "lock", "thread"], answer: 0 },
            { question: "What is the result of sys.getsizeof()?", options: ["object size in bytes", "object type", "object id", "Error"], answer: 0 },
            { question: "Which module is used for memory profiling?", options: ["tracemalloc", "memory", "profile", "debug"], answer: 0 }
        ],
        impossible: [
            { question: "for i in ___(5): print(i)", options: ["range", "list", "len", "map"], answer: 0 },
            { question: "___ x: x + 1", options: ["lambda", "def", "func", "map"], answer: 0 },
            { question: "with open('file.txt', 'r') as ___:", options: ["f", "file", "obj", "o"], answer: 0 },
            { question: "data = { 'a': 1 }; print(data.___('a'))", options: ["get", "pop", "keys", "values"], answer: 0 },
            { question: "nums = [1,2,3]; print(sum(nums) ___ len(nums))", options: ["/", "*", "+", "-"], answer: 0 },
            { question: "try:\n    x=1/0\nexcept ___:\n    print('error')", options: ["ZeroDivisionError", "ValueError", "TypeError", "Exception"], answer: 0 },
            { question: "import math\nprint(math.___(9))", options: ["sqrt", "pow", "exp", "log"], answer: 0 },
            { question: "nums = [1,2,3]; print(nums.___())", options: ["append", "pop", "clear", "sort"], answer: 1 },
            { question: "class A:\n    def ___(self):\n        return 'ok'", options: ["__init__", "__str__", "__repr__", "__call__"], answer: 0 },
            { question: "a = [1,2,3]; b = [*a, 4]; print(___)", options: ["b", "a", "len(a)", "sum(b)"], answer: 0 },
            { question: "nums = [3,1,2]; nums.___(); print(nums)", options: ["sort", "reverse", "append", "remove"], answer: 0 },
            { question: "print('Hello {0}'.___('format'))", options: ["replace", "format", "split", "join"], answer: 1 },
            { question: "for i, v in ___(['a','b']): print(i,v)", options: ["enumerate", "range", "zip", "map"], answer: 0 },
            { question: "from collections import ___", options: ["Counter", "List", "Stack", "Ordered"], answer: 0 },
            { question: "print(___([1,2,3], [4,5,6]))", options: ["zip", "map", "filter", "join"], answer: 0 },
            { question: "nums = [1,2,3]; print(max(nums) ___ min(nums))", options: ["-", "+", "*", "/"], answer: 0 },
            { question: "s = 'hello'; print(s.___('l'))", options: ["count", "find", "index", "split"], answer: 0 },
            { question: "d = {'x':1}; d.___('y',2); print(d)", options: ["update", "setdefault", "add", "insert"], answer: 1 },
            { question: "import random; print(random.___([1,2,3]))", options: ["choice", "shuffle", "randint", "sample"], answer: 0 },
            { question: "print(___(x for x in range(3)))", options: ["sum", "len", "list", "dict"], answer: 2 },
            { question: "nums = [1,2,3]; nums.___(4); print(nums)", options: ["append", "extend", "insert", "pop"], answer: 0 },
            { question: "nums = [1,2,3]; nums.___(0); print(nums)", options: ["pop", "remove", "clear", "sort"], answer: 0 },
            { question: "print('Python'.___())", options: ["lower", "upper", "title", "capitalize"], answer: 1 },
            { question: "x = [1,2]; y = x; print(x is ___)", options: ["y", "x.copy()", "list(x)", "None"], answer: 0 },
            { question: "a = {1,2}; b = {2,3}; print(a ___ b)", options: ["|", "&", "-", "^"], answer: 1 },
            { question: "nums = [1,2,3]; print(nums[___])", options: ["-1", "0", "1", "len(nums)"], answer: 0 },
            { question: "print(bool(___))", options: ["[]", "[0]", "['']", "[1]"], answer: 0 },
            { question: "nums = [1,2,3]; print(___(nums))", options: ["len", "sum", "max", "min"], answer: 0 },
            { question: "d = {'a':1}; print(list(d.___()))", options: ["keys", "values", "items", "get"], answer: 0 },
            { question: "print('a,b,c'.___(','))", options: ["split", "join", "replace", "strip"], answer: 0 },
            { question: "nums = [1,2,3]; print(nums[::___])", options: ["-1", "2", "1", "0"], answer: 0 },
            { question: "x = (1,2,3); print(type(x) is ___)", options: ["tuple", "list", "set", "dict"], answer: 0 },
            { question: "s = ' test '; print(s.___())", options: ["strip", "split", "rstrip", "lstrip"], answer: 0 },
            { question: "nums = [1,2,3]; print(___(nums))", options: ["sum", "map", "filter", "zip"], answer: 0 },
            { question: "print(chr(65) == ___)", options: ["'A'", "'a'", "'65'", "65"], answer: 0 },
            { question: "print(ord('A') == ___)", options: ["65", "97", "64", "66"], answer: 0 },
            { question: "nums = [1,2,3]; print(all(___ > 0 for x in nums))", options: ["x", "nums", "len(nums)", "sum(nums)"], answer: 0 },
            { question: "nums = [1,2,3]; print(any(___ == 2 for x in nums))", options: ["x", "nums", "len(nums)", "sum(nums)"], answer: 0 },
            { question: "print(___(range(5)))", options: ["list", "dict", "set", "tuple"], answer: 0 },
            { question: "print(isinstance(123, ___))", options: ["int", "str", "list", "float"], answer: 0 },
            { question: "nums = [1,2,3]; print(nums.___(0))", options: ["index", "count", "pop", "remove"], answer: 0 },
            { question: "s = 'banana'; print(s.___('a'))", options: ["find", "count", "index", "replace"], answer: 1 },
            { question: "nums = [1,2,3]; print(nums.___(2))", options: ["remove", "insert", "append", "extend"], answer: 1 },
            { question: "print(type(___))", options: ["None", "False", "''", "[]"], answer: 0 },
            { question: "print(2 ___ 3)", options: ["**", "*", "+", "-"], answer: 0 },
            { question: "x = {1,2,3}; print(2 in ___)", options: ["x", "list(x)", "tuple(x)", "dict()"], answer: 0 },
            { question: "nums = [1,2,3]; nums.___(); print(nums)", options: ["clear", "pop", "remove", "del"], answer: 0 },
            { question: "a = {1: 'x'}; print(a.___('y', 'z'))", options: ["get", "setdefault", "update", "pop"], answer: 1 },
            { question: "nums = [1,2,3]; print(___(nums))", options: ["tuple", "dict", "str", "int"], answer: 0 },
            { question: "from math import ___; print(factorial(5))", options: ["factorial", "sqrt", "pow", "log"], answer: 0 },
            { question: "x = 5; print(f'{x:___}')", options: ["03", "2f", "x", "0d"], answer: 0 },
            { question: "s = 'abc'; print(s.___('b','z'))", options: ["replace", "join", "strip", "split"], answer: 0 },
            { question: "nums = [1,2,3]; print(___(nums))", options: ["reversed", "sorted", "enumerate", "map"], answer: 1 },
            { question: "print(bin(5) == ___)", options: ["'0b101'", "'101'", "5", "'0b5'"], answer: 0 },
            { question: "print(hex(255) == ___)", options: ["'0xff'", "'ff'", "255", "'0x255'"], answer: 0 },
            { question: "print(oct(8) == ___)", options: ["'0o10'", "'8'", "'10'", "'0o8'"], answer: 0 },
            { question: "from itertools import ___", options: ["permutations", "list", "repeat", "sum"], answer: 0 },
            { question: "import sys; print(sys.___)", options: ["version", "path", "argv", "exit"], answer: 0 },
            { question: "print(divmod(7,3) == ___)", options: ["(2,1)", "(3,1)", "(2,0)", "(1,1)"], answer: 0 },
            { question: "print(round(3.14159, ___))", options: ["2", "1", "3", "0"], answer: 0 },
            { question: "from functools import ___; print(lru_cache)", options: ["lru_cache", "cache", "wraps", "partial"], answer: 0 },
            { question: "import json; print(json.___({'a':1}))", options: ["dumps", "dump", "loads", "load"], answer: 0 }

        ],
},
        css: {
            easy: [
                { question: "Which property is used to change text color?", options: ["color", "text-color", "font-color", "foreground"], answer: 0 },
                { question: "Which property is used to change background color?", options: ["background", "background-color", "bgcolor", "bg"], answer: 1 },
                { question: "Which property is used to change font size?", options: ["size", "text-size", "font-size", "font"], answer: 2 },
                { question: "Which property makes text bold?", options: ["font-weight", "text-bold", "weight", "bold"], answer: 0 },
                { question: "Which property makes text italic?", options: ["font-style", "text-italic", "italic", "style"], answer: 0 },
                { question: "Which property is used to underline text?", options: ["text-decoration", "decoration", "underline", "text-line"], answer: 0 },
                { question: "Which property controls text alignment?", options: ["align", "text-align", "position", "justify"], answer: 1 },
                { question: "Which property controls font family?", options: ["font-family", "text-font", "family", "typeface"], answer: 0 },
                { question: "Which property controls line spacing?", options: ["line-height", "spacing", "line-space", "height"], answer: 0 },
                { question: "Which property is used for margins?", options: ["margin", "space", "padding", "gap"], answer: 0 },
                { question: "Which property is used for padding?", options: ["padding", "space", "margin", "gap"], answer: 0 },
                { question: "Which property sets background images?", options: ["background-image", "image", "bg-image", "background"], answer: 0 },
                { question: "Which property makes text uppercase?", options: ["text-transform", "transform", "uppercase", "text-case"], answer: 0 },
                { question: "Which property sets text alignment left, right, or center?", options: ["text-align", "align", "position", "justify"], answer: 0 },
                { question: "Which property controls the cursor style?", options: ["cursor", "pointer", "mouse", "style"], answer: 0 }
            ],
            medium: [
                { question: "Which property controls element spacing inside the border?", options: ["margin", "padding", "gap", "spacing"], answer: 1 },
                { question: "Which property sets the width of an element?", options: ["size", "width", "element-width", "dimension"], answer: 1 },
                { question: "Which property sets the height of an element?", options: ["height", "length", "element-height", "dimension"], answer: 0 },
                { question: "Which property controls border thickness?", options: ["border-width", "border-size", "border", "outline"], answer: 0 },
                { question: "Which property controls border color?", options: ["border-color", "color-border", "border", "outline-color"], answer: 0 },
                { question: "Which property controls border style?", options: ["border-style", "style-border", "border-type", "outline-style"], answer: 0 },
                { question: "Which property makes corners rounded?", options: ["border-radius", "corner", "radius", "round"], answer: 0 },
                { question: "Which property controls element visibility?", options: ["display", "visibility", "show", "hidden"], answer: 1 },
                { question: "Which property hides an element but keeps space?", options: ["display:none", "opacity:0", "visibility:hidden", "hidden"], answer: 2 },
                { question: "Which property controls background repeat?", options: ["background-repeat", "repeat", "bg-repeat", "tile"], answer: 0 },
                { question: "Which property controls background position?", options: ["background-position", "position", "bg-pos", "background-align"], answer: 0 },
                { question: "Which property controls list style?", options: ["list-style", "list-type", "bullet", "marker"], answer: 0 },
                { question: "Which property changes link color?", options: ["color", "text-color", "link-color", "a-color"], answer: 0 },
                { question: "Which property controls table border collapse?", options: ["border-collapse", "collapse", "table-collapse", "border"], answer: 0 },
                { question: "Which property controls table cell spacing?", options: ["border-spacing", "cell-spacing", "spacing", "padding"], answer: 0 },
                { question: "Which property controls overflow content?", options: ["overflow", "scroll", "clip", "hide"], answer: 0 },
                { question: "Which property controls font weight?", options: ["font-weight", "weight", "boldness", "thickness"], answer: 0 },
                { question: "Which property sets minimum width?", options: ["min-width", "width-min", "minimum-width", "limit-width"], answer: 0 },
                { question: "Which property sets maximum width?", options: ["max-width", "width-max", "maximum-width", "limit-width"], answer: 0 },
                { question: "Which property controls word spacing?", options: ["word-spacing", "spacing", "letter-spacing", "gap"], answer: 0 },
                { question: "Which property controls letter spacing?", options: ["letter-spacing", "spacing", "word-spacing", "gap"], answer: 0 },
                { question: "Which property changes the mouse cursor on hover?", options: ["cursor", "pointer", "mouse", "hover"], answer: 0 },
                { question: "Which property sets element opacity?", options: ["opacity", "visibility", "alpha", "transparent"], answer: 0 },
                { question: "Which property controls the outline color?", options: ["outline-color", "border-color", "color", "highlight"], answer: 0 },
                { question: "Which property removes list bullets?", options: ["list-style:none", "no-bullet", "list:none", "bullet:none"], answer: 0 }
            ],
            hard: [
                { question: "Which unit is relative to the root font size?", options: ["em", "rem", "px", "%"], answer: 1 },
                { question: "Which property controls element stacking order?", options: ["position", "index", "z-index", "stack"], answer: 2 },
                { question: "Which property makes an element a flex container?", options: ["display:flex", "flex", "flexbox", "container"], answer: 0 },
                { question: "Which property controls flex item growth?", options: ["flex-grow", "grow", "expand", "flex"], answer: 0 },
                { question: "Which property controls grid columns?", options: ["grid-template-columns", "columns", "grid-columns", "col-template"], answer: 0 },
                { question: "Which property makes an element sticky?", options: ["position:sticky", "sticky", "display:sticky", "fixed"], answer: 0 },
                { question: "Which property controls element overflow?", options: ["overflow", "scroll", "clip", "hide"], answer: 0 },
                { question: "Which property adds shadow to a box?", options: ["box-shadow", "shadow", "element-shadow", "drop-shadow"], answer: 0 },
                { question: "Which property adds shadow to text?", options: ["text-shadow", "font-shadow", "shadow", "drop-shadow"], answer: 0 },
                { question: "Which property controls animations?", options: ["animation", "animate", "motion", "transition"], answer: 0 },
                { question: "Which property controls transition speed?", options: ["transition-duration", "duration", "speed", "time"], answer: 0 },
                { question: "Which property controls transition delay?", options: ["transition-delay", "delay", "time-delay", "animation-delay"], answer: 0 },
                { question: "Which property controls transition effect?", options: ["transition-timing-function", "ease", "timing", "transition-effect"], answer: 0 },
                { question: "Which property defines a grid area?", options: ["grid-area", "area", "grid", "region"], answer: 0 },
                { question: "Which property defines a grid row start?", options: ["grid-row-start", "row-start", "grid-start", "row"], answer: 0 },
                { question: "Which property defines a grid column start?", options: ["grid-column-start", "column-start", "col-start", "grid-start"], answer: 0 },
                { question: "Which property controls flex item alignment?", options: ["align-items", "justify-content", "flex-align", "align"], answer: 0 },
                { question: "Which property controls flex content distribution?", options: ["justify-content", "align-items", "flex-distribute", "content"], answer: 0 },
                { question: "Which property sets grid template rows?", options: ["grid-template-rows", "rows", "grid-rows", "row-template"], answer: 0 },
                { question: "Which property repeats grid patterns?", options: ["repeat()", "grid-repeat", "loop()", "pattern()"], answer: 0 },
                { question: "Which property sets a custom CSS variable?", options: ["--var", "var()", "variable", "define"], answer: 0 },
                { question: "Which function retrieves a custom property?", options: ["var()", "custom()", "prop()", "getVar()"], answer: 0 },
                { question: "Which property applies a transform?", options: ["transform", "change", "rotate", "scale"], answer: 0 },
                { question: "Which property rotates an element?", options: ["transform:rotate()", "rotate", "angle", "rotation"], answer: 0 },
                { question: "Which property scales an element?", options: ["transform:scale()", "scale", "resize", "zoom"], answer: 0 },
                { question: "Which property skews an element?", options: ["transform:skew()", "skew", "tilt", "angle"], answer: 0 },
                { question: "Which property translates an element?", options: ["transform:translate()", "move", "translate", "shift"], answer: 0 },
                { question: "Which property defines keyframes?", options: ["@keyframes", "@animation", "@frames", "@motion"], answer: 0 },
                { question: "Which property applies a filter?", options: ["filter", "effects", "visual", "style"], answer: 0 },
                { question: "Which function makes grayscale?", options: ["grayscale()", "gray()", "bw()", "monochrome()"], answer: 0 },
                { question: "Which function makes blur?", options: ["blur()", "fuzzy()", "shadow()", "opacity()"], answer: 0 },
                { question: "Which property controls clip path?", options: ["clip-path", "clip", "path", "mask"], answer: 0 },
                { question: "Which property controls masking?", options: ["mask", "masking", "clip", "cover"], answer: 0 },
                { question: "Which property controls writing mode?", options: ["writing-mode", "text-direction", "text-mode", "direction"], answer: 0 },
                { question: "Which property controls scroll snapping?", options: ["scroll-snap-type", "snap", "scroll", "snap-type"], answer: 0 },
                { question: "Which property controls object fit?", options: ["object-fit", "fit", "img-fit", "contain"], answer: 0 },
                { question: "Which property controls object position?", options: ["object-position", "position", "img-position", "align"], answer: 0 },
                { question: "Which property sets counter style?", options: ["counter-reset", "counter", "list-counter", "counter-style"], answer: 0 },
                { question: "Which property increments counter?", options: ["counter-increment", "counter-add", "counter-next", "counter"], answer: 0 }
            ],
            impossible: [
                { question: "h1 { color: ___; }", options: ["red", "font-size", "block", "inline"], answer: 0 },
                { question: "p { display: ___; }", options: ["block", "inline", "flex", "grid"], answer: 0 },
                { question: "div { position: ___; }", options: ["relative", "bold", "italic", "center"], answer: 0 },
                { question: "span { font-weight: ___; }", options: ["bold", "uppercase", "block", "inline"], answer: 0 },
                { question: "a:hover { text-decoration: ___; }", options: ["underline", "italic", "none", "capitalize"], answer: 0 },
                { question: "ul { list-style-type: ___; }", options: ["circle", "block", "inline", "italic"], answer: 0 },
                { question: "img { max-width: ___; }", options: ["100%", "cover", "flex", "grid"], answer: 0 },
                { question: "div { background-repeat: ___; }", options: ["no-repeat", "cover", "bold", "italic"], answer: 0 },
                { question: "p { text-transform: ___; }", options: ["uppercase", "block", "italic", "inline"], answer: 0 },
                { question: "body { overflow: ___; }", options: ["hidden", "cover", "bold", "fixed"], answer: 0 },
                { question: "section { margin-___: 10px; }", options: ["top", "block", "cover", "center"], answer: 0 },
                { question: "article { padding-___: 20px; }", options: ["left", "grid", "inline", "bold"], answer: 0 },
                { question: "h2 { font-style: ___; }", options: ["italic", "block", "center", "fixed"], answer: 0 },
                { question: "nav { display: ___; }", options: ["flex", "inline", "bold", "cover"], answer: 0 },
                { question: "main { background-size: ___; }", options: ["cover", "bold", "italic", "inline"], answer: 0 },
                { question: "footer { clear: ___; }", options: ["both", "inline", "bold", "grid"], answer: 0 },
                { question: "header { z-index: ___; }", options: ["10", "inline", "block", "cover"], answer: 0 },
                { question: "button { cursor: ___; }", options: ["pointer", "block", "inline", "italic"], answer: 0 },
                { question: "input { border-___: 1px solid #000; }", options: ["bottom", "cover", "inline", "bold"], answer: 0 },
                { question: "textarea { resize: ___; }", options: ["none", "block", "flex", "italic"], answer: 0 },
                { question: "div { box-shadow: 0 0 5px ___; }", options: ["black", "cover", "inline", "grid"], answer: 0 },
                { question: "p { line-height: ___; }", options: ["1.5", "block", "cover", "bold"], answer: 0 },
                { question: "img { object-fit: ___; }", options: ["cover", "italic", "grid", "inline"], answer: 0 },
                { question: "table { border-collapse: ___; }", options: ["collapse", "cover", "inline", "block"], answer: 0 },
                { question: "th { text-align: ___; }", options: ["left", "cover", "bold", "italic"], answer: 0 },
                { question: "td { vertical-align: ___; }", options: ["middle", "inline", "bold", "grid"], answer: 0 },
                { question: "a { target-name: ___; }", options: ["new", "block", "inline", "cover"], answer: 0 },
                { question: "div { border-radius: ___; }", options: ["50%", "cover", "inline", "italic"], answer: 0 },
                { question: "section { min-height: ___; }", options: ["100vh", "cover", "inline", "block"], answer: 0 },
                { question: "aside { float: ___; }", options: ["right", "cover", "grid", "inline"], answer: 0 },
                { question: "p { word-spacing: ___; }", options: ["5px", "cover", "block", "inline"], answer: 0 },
                { question: "span { letter-spacing: ___; }", options: ["2px", "cover", "grid", "italic"], answer: 0 },
                { question: "div { opacity: ___; }", options: ["0.5", "cover", "inline", "bold"], answer: 0 },
                { question: "h3 { visibility: ___; }", options: ["hidden", "cover", "block", "inline"], answer: 0 },
                { question: "nav { justify-content: ___; }", options: ["center", "cover", "grid", "italic"], answer: 0 },
                { question: "main { align-items: ___; }", options: ["flex-start", "block", "inline", "cover"], answer: 0 },
                { question: "body { background-attachment: ___; }", options: ["fixed", "cover", "grid", "inline"], answer: 0 },
                { question: "section { grid-template-columns: ___; }", options: ["1fr 1fr", "cover", "inline", "block"], answer: 0 },
                { question: "article { flex-direction: ___; }", options: ["row", "grid", "cover", "inline"], answer: 0 },
                { question: "header { position: ___; }", options: ["sticky", "cover", "inline", "block"], answer: 0 },
                { question: "div { background-clip: ___; }", options: ["padding-box", "cover", "grid", "inline"], answer: 0 },
                { question: "input { outline-___: none; }", options: ["style", "cover", "block", "italic"], answer: 0 },
                { question: "textarea { caret-color: ___; }", options: ["blue", "cover", "inline", "grid"], answer: 0 },
                { question: "p { white-space: ___; }", options: ["nowrap", "cover", "inline", "block"], answer: 0 },
                { question: "img { filter: ___; }", options: ["blur(5px)", "cover", "grid", "italic"], answer: 0 },
                { question: "button { user-select: ___; }", options: ["none", "cover", "inline", "block"], answer: 0 },
                { question: "div { overflow-___: scroll; }", options: ["y", "cover", "grid", "inline"], answer: 0 },
                { question: "span { text-shadow: 1px 1px ___; }", options: ["gray", "cover", "block", "italic"], answer: 0 },
                { question: "body { font-variant: ___; }", options: ["small-caps", "cover", "inline", "grid"], answer: 0 },
                { question: "h1 { animation-___: 2s fadeIn; }", options: ["duration", "cover", "block", "italic"], answer: 0 },
                { question: "div { transform: ___; }", options: ["rotate(45deg)", "cover", "inline", "bold"], answer: 0 },
                { question: "section { transition-___: all 0.3s; }", options: ["property", "cover", "block", "italic"], answer: 0 },
                { question: "p { clip-path: ___; }", options: ["circle(50%)", "cover", "inline", "grid"], answer: 0 },
                { question: "main { grid-gap: ___; }", options: ["20px", "cover", "block", "italic"], answer: 0 },
                { question: "article { align-content: ___; }", options: ["space-between", "cover", "grid", "inline"], answer: 0 },
                { question: "header { background-origin: ___; }", options: ["content-box", "cover", "inline", "block"], answer: 0 },
                { question: "div { writing-mode: ___; }", options: ["vertical-rl", "cover", "block", "italic"], answer: 0 },
                { question: "p { hyphens: ___; }", options: ["auto", "cover", "grid", "inline"], answer: 0 },
                { question: "nav { scroll-behavior: ___; }", options: ["smooth", "cover", "block", "italic"], answer: 0 },
                { question: "footer { column-count: ___; }", options: ["3", "cover", "inline", "grid"], answer: 0 }
            ],
},
            javascript: {
                easy: [
                    { question: "What keyword is used to declare a variable that can change value?", options: ["const", "let", "var", "static"], answer: 1 },
                    { question: "Which method prints output to the browser console?", options: ["print()", "console.log()", "log()", "alert()"], answer: 1 },
                    { question: "How do you write a single-line comment in JavaScript?", options: ["<!-- -->", "//", "/* */", "#"], answer: 1 },
                    { question: "What symbol is used for strict equality comparison?", options: ["==", "===", "!=", "="], answer: 1 },
                    { question: "Which array method adds an element to the end?", options: ["push()", "pop()", "shift()", "unshift()"], answer: 0 },
                    { question: "What keyword defines a function?", options: ["func", "function", "def", "method"], answer: 1 },
                    { question: "How do you access the first element of an array?", options: ["arr.1", "arr[1]", "arr[0]", "first(arr)"], answer: 2 },
                    { question: "Which object represents the browser window?", options: ["document", "window", "screen", "navigator"], answer: 1 },
                    { question: "How do you show a popup alert in JavaScript?", options: ["popup()", "alert()", "console.log()", "msg()"], answer: 1 },
                    { question: "What method converts a JSON object into a string?", options: ["JSON.stringify()", "JSON.parse()", "toString()", "stringifyJSON()"], answer: 0 },
                    { question: "Which keyword creates a block-scoped variable?", options: ["var", "let", "define", "static"], answer: 1 },
                    { question: "What does typeof [] return?", options: ["array", "object", "list", "collection"], answer: 1 },
                    { question: "Which operator is used to concatenate strings?", options: ["+", "&", ".", ","], answer: 0 },
                    { question: "How do you declare a constant in JavaScript?", options: ["let", "const", "static", "final"], answer: 1 },
                    { question: "What keyword stops a loop immediately?", options: ["stop", "exit", "break", "return"], answer: 2 }
                ],
                medium: [
                    { question: "Which array method removes the first element?", options: ["pop()", "shift()", "splice()", "slice()"], answer: 1 },
                    { question: "What does the map() method return?", options: ["modified array", "new array", "object", "number"], answer: 1 },
                    { question: "Which function executes code after a delay?", options: ["setInterval()", "delay()", "setTimeout()", "sleep()"], answer: 2 },
                    { question: "What is returned by Array.isArray({})?", options: ["true", "false", "undefined", "object"], answer: 1 },
                    { question: "Which method combines two arrays?", options: ["concat()", "merge()", "combine()", "join()"], answer: 0 },
                    { question: "What is the difference between == and ===?", options: ["No difference", "=== checks value only", "=== checks value and type", "== checks type only"], answer: 2 },
                    { question: "What keyword is used inside a class to call its parent?", options: ["super", "this", "parent", "extends"], answer: 0 },
                    { question: "Which method finds the index of an element in an array?", options: ["find()", "findIndex()", "indexOf()", "search()"], answer: 2 },
                    { question: "How do you define a default parameter in a function?", options: ["param=default", "param:default", "param==default", "default(param)"], answer: 0 },
                    { question: "What does Object.keys(obj) return?", options: ["array of values", "array of keys", "object", "string"], answer: 1 },
                    { question: "Which loop is best for iterating over object properties?", options: ["for", "forEach", "for...in", "for...of"], answer: 2 },
                    { question: "How do you create a promise that resolves immediately?", options: ["Promise.done()", "Promise.resolve()", "Promise.success()", "new Promise()"], answer: 1 },
                    { question: "What does JSON.parse(\"10\") return?", options: ["10", "string", "error", "undefined"], answer: 0 },
                    { question: "Which keyword is used with asynchronous functions?", options: ["async", "await", "defer", "yield"], answer: 0 },
                    { question: "What is the default value of an uninitialized variable?", options: ["null", "undefined", "0", "false"], answer: 1 },
                    { question: "How do you declare an arrow function?", options: ["=>", "->", "function=>", "() => {}"], answer: 3 },
                    { question: "What does arr.includes(x) return?", options: ["boolean", "index", "value", "error"], answer: 0 },
                    { question: "Which built-in object represents regular expressions?", options: ["Regex", "RegExp", "Pattern", "Expression"], answer: 1 },
                    { question: "How do you get the length of a string?", options: ["length()", "len()", "str.length", "size()"], answer: 2 },
                    { question: "What does null == undefined evaluate to?", options: ["true", "false", "error", "undefined"], answer: 0 },
                    { question: "Which array method removes and returns the last element?", options: ["pop()", "push()", "shift()", "splice()"], answer: 0 },
                    { question: "How do you stop event bubbling in JavaScript?", options: ["stop()", "prevent()", "stopPropagation()", "cancel()"], answer: 2 },
                    { question: "What is returned by typeof NaN?", options: ["NaN", "undefined", "object", "number"], answer: 3 },
                    { question: "What method joins all array elements into a string?", options: ["join()", "concat()", "merge()", "stringify()"], answer: 0 },
                    { question: "How do you convert a string to an integer in JavaScript?", options: ["parseInt()", "Number()", "toInteger()", "int()"], answer: 0 }
                ],
                hard: [
                    { question: "What is a closure in JavaScript?", options: ["A function with access to its scope", "An object reference", "A loop structure", "A class"], answer: 0 },
                    { question: "How does the this keyword behave in arrow functions?", options: ["Dynamic", "Static", "Global", "Changes"], answer: 1 },
                    { question: "What happens when you call a function with new?", options: ["Creates a class", "Creates an object", "Throws error", "Returns function"], answer: 1 },
                    { question: "What is the prototype chain in JavaScript?", options: ["Scope chain", "Object inheritance chain", "Call stack", "Event chain"], answer: 1 },
                    { question: "How does event delegation work?", options: ["By capturing child events at parent", "By removing listeners", "By preventing events", "By bubbling only"], answer: 0 },
                    { question: "What is the difference between call, apply, and bind?", options: ["They are identical", "Different ways to invoke functions", "Bind changes prototype", "Call changes closure"], answer: 1 },
                    { question: "How do you make an object immutable?", options: ["Object.freeze()", "Object.lock()", "Object.seal()", "Object.constant()"], answer: 0 },
                    { question: "What does the async keyword do?", options: ["Runs sync", "Returns a promise", "Blocks code", "Delays function"], answer: 1 },
                    { question: "How does await affect promises?", options: ["Rejects", "Resolves immediately", "Waits until resolved", "Skips"], answer: 2 },
                    { question: "What is the event loop in JavaScript?", options: ["Loop function", "Async mechanism", "Promise executor", "Timer"], answer: 1 },
                    { question: "How does hoisting work in JavaScript?", options: ["Moves vars and functions to top", "Deletes variables", "Blocks scope", "Ignores declarations"], answer: 0 },
                    { question: "What is the difference between undefined and not defined?", options: ["Same", "Undefined exists but not defined doesn’t", "Opposite", "Error"], answer: 1 },
                    { question: "How do generators (function*) work?", options: ["Return async code", "Return iterator", "Return array", "Return promise"], answer: 1 },
                    { question: "What is the purpose of Symbol in JavaScript?", options: ["Unique identifiers", "Classes", "Numbers", "Strings"], answer: 0 },
                    { question: "What is the difference between WeakMap and Map?", options: ["WeakMap allows garbage collection", "Map is immutable", "WeakMap stores numbers only", "Same"], answer: 0 },
                    { question: "What is the difference between Object.seal and Object.freeze?", options: ["Seal allows edits but not add/remove", "Freeze allows edits", "Both same", "Seal is stricter"], answer: 0 },
                    { question: "What is the purpose of Reflect in JavaScript?", options: ["Perform object operations", "Store metadata", "Handle async", "Debug"], answer: 0 },
                    { question: "How does a Proxy object work?", options: ["Intercepts operations", "Stores data", "Freezes object", "Copies object"], answer: 0 },
                    { question: "What is the difference between Promise.all and Promise.race?", options: ["All waits all, Race waits first", "Race waits all", "Same", "Race rejects only"], answer: 0 },
                    { question: "What is the difference between microtasks and macrotasks?", options: ["Micro run first", "Macro run first", "Same", "Only macros exist"], answer: 0 },
                    { question: "What is the difference between classical inheritance and prototypal inheritance?", options: ["Prototypal uses objects", "Classical uses prototypes", "Same", "Both async"], answer: 0 },
                    { question: "How does Object.create(null) differ from {}?", options: ["No prototype", "Adds prototype", "Same", "Throws error"], answer: 0 },
                    { question: "What is the difference between for...in and for...of?", options: ["in = keys, of = values", "in = values, of = keys", "Same", "Both arrays only"], answer: 0 },
                    { question: "What is an IIFE?", options: ["Function that runs immediately", "Loop", "Class", "Async block"], answer: 0 },
                    { question: "How does optional chaining (?.) work?", options: ["Checks null/undefined", "Checks type", "Checks number", "Checks string"], answer: 0 },
                    { question: "What is the difference between == and Object.is?", options: ["Object.is handles NaN correctly", "Same", "== handles NaN", "Object.is is looser"], answer: 0 },
                    { question: "How does destructuring assignment work with arrays?", options: ["Extracts values", "Clones array", "Removes values", "Changes array"], answer: 0 },
                    { question: "What is the difference between rest (...) and spread (...) operators?", options: ["Rest collects args, Spread expands", "Spread collects, Rest expands", "Same", "Both wrong"], answer: 0 },
                    { question: "How does dynamic import (import()) work?", options: ["Loads modules at runtime", "Static only", "Throws error", "Imports JSON only"], answer: 0 },
                    { question: "What is the purpose of BigInt?", options: ["Handle large integers", "Handle strings", "Handle floats", "Handle symbols"], answer: 0 },
                    { question: "How does TDZ affect variables?", options: ["Cannot access before declared", "Accessible always", "Throws warning", "Skips declaration"], answer: 0 },
                    { question: "What is the difference between NaN and Number.NaN?", options: ["Same", "NaN is global, Number.NaN is property", "Different values", "Number.NaN is undefined"], answer: 1 }
                ],

                impossible: [
                    { question: "class A { constructor(){ this.x=1 } } class B extends A { constructor(){ super(); this.y=2 } } console.log(new B().___)", options: ["x", "y", "z", "super"], answer: 0 },
                    { question: "let x = (function(){ return arguments })(); console.log(typeof x.___)", options: ["length", "callee", "caller", "prototype"], answer: 1 },
                    { question: "function* gen(){ yield 1; yield 2 } let g = gen(); console.log(g.___().value)", options: ["next", "yield", "return", "call"], answer: 0 },
                    { question: "let obj = {a:1}; let p = new Proxy(obj,{}); console.log(p.___)", options: ["a", "b", "c", "d"], answer: 0 },
                    { question: "console.log(Object.getPrototypeOf([]) === Array.___)", options: ["prototype", "constructor", "length", "name"], answer: 0 },
                    { question: "let s = Symbol(); console.log(typeof s.___)", options: ["description", "toString", "valueOf", "keyFor"], answer: 1 },
                    { question: "console.log(typeof (async function(){}).___)", options: ["constructor", "prototype", "then", "length"], answer: 2 },
                    { question: "let ws = new WeakSet(); let o={}; ws.add(o); console.log(ws.has(___))", options: ["o", "{}", "[]", "null"], answer: 0 },
                    { question: "let wm = new WeakMap(); let o={}; wm.set(o,123); console.log(wm.get(___))", options: ["o", "123", "{}", "null"], answer: 0 },
                    { question: "console.log(Reflect.___({a:1}, 'a'))", options: ["get", "set", "has", "deleteProperty"], answer: 0 },
                    { question: "console.log(Reflect.___({a:1}, 'a'))", options: ["has", "get", "set", "ownKeys"], answer: 0 },
                    { question: "console.log(Object.is(NaN, ___))", options: ["NaN", "undefined", "0", "null"], answer: 0 },
                    { question: "let f = new Function('a','b','return a+b'); console.log(f.___)", options: ["name", "length", "prototype", "caller"], answer: 1 },
                    { question: "console.log(eval.___)", options: ["name", "caller", "prototype", "length"], answer: 0 },
                    { question: "console.log((function(){}).___)", options: ["name", "length", "prototype", "toString"], answer: 0 },
                    { question: "console.log(typeof new Map().___)", options: ["size", "length", "count", "length()"], answer: 0 },
                    { question: "let set = new Set([1,2,3]); console.log(set.___)", options: ["size", "length", "count", "length()"], answer: 0 },
                    { question: "let arr=[1,2,3]; console.log(arr.___(x=>x>1))", options: ["find", "map", "reduce", "filter"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyDescriptor({a:1}, 'a').___)", options: ["value", "configurable", "writable", "enumerable"], answer: 0 },
                    { question: "console.log(Object.___({}, {a:{value:10}}).a)", options: ["create", "defineProperties", "assign", "defineProperty"], answer: 3 },
                    { question: "console.log(Object.getOwnPropertyNames(Math).includes('___'))", options: ["PI", "LN2", "E", "SQRT2"], answer: 0 },
                    { question: "console.log(Object.___([1,2,3]))", options: ["freeze", "seal", "preventExtensions", "assign"], answer: 0 },
                    { question: "console.log(JSON.___({a:1}))", options: ["stringify", "parse", "toString", "convert"], answer: 0 },
                    { question: "console.log(JSON.___('{\"a\":1}').a)", options: ["parse", "stringify", "eval", "fromJSON"], answer: 0 },
                    { question: "let x = new Int8Array(2); console.log(x.___)", options: ["length", "byteLength", "BYTES_PER_ELEMENT", "buffer"], answer: 2 },
                    { question: "console.log(typeof new Proxy({},{}).___)", options: ["constructor", "prototype", "toString", "valueOf"], answer: 0 },
                    { question: "console.log(typeof import('fs').___)", options: ["then", "catch", "finally", "all"], answer: 0 },
                    { question: "console.log(Array.prototype.___.call('abc'))", options: ["slice", "map", "filter", "concat"], answer: 0 },
                    { question: "console.log(Function.prototype.___.call(()=>42))", options: ["call", "apply", "bind", "toString"], answer: 3 },
                    { question: "let x = (function f(){ return f.___ }).toString(); console.log(x.includes('f'))", options: ["name", "caller", "prototype", "length"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertySymbols(Symbol).includes(Symbol.___))", options: ["iterator", "asyncIterator", "toStringTag", "match"], answer: 2 },
                    { question: "console.log((async function(){}).constructor.___)", options: ["name", "length", "prototype", "caller"], answer: 0 },
                    { question: "console.log(typeof (function*(){}).___)", options: ["prototype", "constructor", "name", "caller"], answer: 0 },
                    { question: "console.log(Atomics.___)", options: ["add", "wait", "notify", "all"], answer: 0 },
                    { question: "let sab = new SharedArrayBuffer(8); console.log(sab.___)", options: ["byteLength", "length", "size", "capacity"], answer: 0 },
                    { question: "console.log(Reflect.ownKeys({a:1, [Symbol('b')]:2}).___)", options: ["length", "size", "count", "keys"], answer: 0 },
                    { question: "console.log(new Error('msg').___)", options: ["message", "stack", "name", "cause"], answer: 0 },
                    { question: "console.log(Math.___)", options: ["E", "PI", "LN2", "SQRT2"], answer: 1 },
                    { question: "console.log(globalThis.___)", options: ["Math", "Array", "Object", "undefined"], answer: 0 },
                    { question: "console.log(new Date().___)", options: ["getTime", "toISOString", "toString", "getFullYear"], answer: 3 },
                    { question: "console.log(typeof Intl.___)", options: ["DateTimeFormat", "NumberFormat", "Collator", "PluralRules"], answer: 0 },
                    { question: "console.log(typeof WebAssembly.___)", options: ["Module", "Instance", "Memory", "Table"], answer: 0 },
                    { question: "let x = 10n; console.log(typeof ___)", options: ["x", "BigInt", "Number", "String"], answer: 0 },
                    { question: "console.log(typeof Promise.___)", options: ["all", "race", "resolve", "reject"], answer: 0 },
                    { question: "console.log(Object.getPrototypeOf(async function(){}).constructor.___)", options: ["name", "prototype", "caller", "length"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Function.prototype).includes('___'))", options: ["bind", "apply", "call", "toString"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Array.prototype).includes('___'))", options: ["map", "filter", "push", "pop"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(String.prototype).includes('___'))", options: ["charAt", "slice", "split", "toUpperCase"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Number.prototype).includes('___'))", options: ["toFixed", "toString", "valueOf", "toPrecision"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Boolean.prototype).includes('___'))", options: ["toString", "valueOf", "constructor", "prototype"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(RegExp.prototype).includes('___'))", options: ["test", "exec", "compile", "toString"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Map.prototype).includes('___'))", options: ["set", "get", "has", "delete"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Set.prototype).includes('___'))", options: ["add", "has", "delete", "clear"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(WeakMap.prototype).includes('___'))", options: ["set", "get", "has", "delete"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(WeakSet.prototype).includes('___'))", options: ["add", "has", "delete", "clear"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Symbol).includes('___'))", options: ["for", "keyFor", "asyncIterator", "toString"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Reflect).includes('___'))", options: ["get", "set", "has", "deleteProperty"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(Atomics).includes('___'))", options: ["add", "sub", "and", "or"], answer: 0 },
                    { question: "console.log(Object.getOwnPropertyNames(WebAssembly).includes('___'))", options: ["Module", "Instance", "Memory", "Table"], answer: 0 }
               
                ]
            }

};

// Global Variables
let playerName = "";
let selectedLang = "";
let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let shuffledOptions = [];
const playerNameStorageKey = "grammarticodePlayerName";

const questionLimits = { easy: 15, medium: 25, hard: 40, impossible: 60 };
const languageLabels = {
    java: "Java",
    html: "HTML",
    python: "Python",
    css: "CSS",
    javascript: "JavaScript"
};
const answerExplanations = {
    "public static void main(string[] args)": "This is Java's entry-point method, where a standalone program starts running.",
    "new": "Creates a new object or class instance in memory.",
    "int": "Represents a whole number without decimal places.",
    "double": "Represents a numeric value that can include decimals.",
    "string": "Represents text made from a sequence of characters.",
    "char": "Represents a single character.",
    "boolean": "Represents a true-or-false value.",
    "set": "Represents an unordered collection of unique values.",
    "//": "Starts a single-line comment.",
    "system": "In Java, the System class provides access to standard input, output, and system utilities.",
    "final": "Marks a value or member as fixed; a final variable cannot be reassigned.",
    "==": "Checks whether two values are equal.",
    "===": "Checks whether two values are equal and also have the same type.",
    "extends": "Lets one class inherit fields and methods from another class.",
    "implements": "Lets a class provide the behavior required by an interface.",
    "super": "Refers to the parent class and can call parent constructors or methods.",
    "this": "Refers to the current object instance.",
    "private": "Allows access only inside the same class.",
    "public": "Allows access from anywhere the member is visible.",
    "protected": "Allows access inside the same package and from subclasses.",
    "arraylist": "A resizable list collection that keeps order and allows duplicate values.",
    "vector": "A synchronized resizable list in Java.",
    "tostring()": "Returns a string representation of an object.",
    "equals()": "Compares object contents or values rather than references.",
    "length()": "Returns the number of items or characters, depending on context.",
    "do-while": "Runs the loop body once before checking the condition.",
    "stack": "A LIFO structure where the last item added is the first one removed.",
    "assert": "Checks that a condition is true, mainly for debugging and testing.",
    "::": "This operator creates a method reference in Java.",
    "alt": "Provides alternative text that describes an image.",
    "aria-label": "Provides an accessible label, especially for screen readers.",
    "href": "Stores the destination URL of a link.",
    "src": "Points to the source file for an image, script, or other resource.",
    "id": "Gives an element a unique identifier on the page.",
    "flex": "Turns an element into a flex container for flexible layout.",
    "margin": "Controls the outer space around an element.",
    "padding": "Controls the inner space between content and the border.",
    "color": "Sets the text color.",
    "background-color": "Sets an element's background color.",
    "display": "Controls how an element is rendered in the layout.",
    "let": "Declares a block-scoped variable in JavaScript.",
    "const": "Declares a block-scoped constant in JavaScript.",
    "function": "Defines a reusable block of code.",
    "settimeout()": "Runs a function once after a specified delay.",
    "concat()": "Combines arrays or strings into a new value.",
    "indexof()": "Returns the position of a matching item, or -1 when it is not found.",
    "promise.resolve()": "Creates a promise that is already resolved.",
    "async": "Marks a function as asynchronous and makes it return a promise.",
    "await": "Pauses inside an async function until a promise settles.",
    "regexp": "JavaScript's built-in object for working with regular expressions.",
    "object.freeze()": "Prevents an object's properties from being added, removed, or changed.",
    "json.parse()": "Converts a JSON string into a JavaScript value or object.",
    "json.stringify()": "Converts a JavaScript value into a JSON string.",
    "class": "Defines a class blueprint for creating objects.",
    "def": "Defines a function in Python.",
    "print()": "Displays output to the console or screen.",
    "true": "Represents a Boolean value for yes, on, or correct.",
    "false": "Represents a Boolean value for no, off, or incorrect.",
    "object-oriented": "Describes a style of programming built around classes, objects, and reusable behavior.",
    "none": "Represents the absence of a value, or shows that no keyword is written in that position.",
    "local": "Means the variable exists only inside the method or block where it was declared.",
    "encapsulation": "Hides internal implementation details and controls access to data.",
    "package-private": "Means no access modifier is written, so access is limited to the same package.",
    "comparable": "Defines a natural ordering by implementing compareTo().",
    "2 bytes": "Is the size of Java char because it stores a single Unicode code unit.",
    "5 elements": "Means the array can store five values, indexed from 0 to 4.",
    "arrayindexoutofboundsexception": "Is thrown when code uses an array index outside the valid range.",
    "immutable": "Means the value cannot be changed after the object is created.",
    "127": "Is the maximum signed value that fits in a Java byte.",
    "prevents caching": "Forces reads and writes to go through main memory so thread updates stay visible.",
    "join()": "Waits for a thread to finish before the current thread continues.",
    "illegalthreadstateexception": "Is thrown when a thread operation is not valid for the thread's current state.",
    "8 bytes": "Is the storage size of a Java long value.",
    "functional interface": "Means an interface has exactly one abstract method, so a lambda can implement it.",
    "synchronized": "Allows only one thread at a time to execute a protected block or method.",
    "excludes from serialization": "Means a transient field is skipped when an object is serialized.",
    "thread.currentthread()": "Returns the thread that is currently executing.",
    "@deprecated": "Marks code as outdated so compilers and developers know a newer alternative should be used.",
    "runtime inspection": "Means examining classes, methods, fields, or annotations while the program is running.",
    "stream()": "Creates a stream pipeline from a collection for operations like filter, map, and reduce.",
    "asynchronous programming": "Means work can continue while another task computes a future result.",
    "factory": "Creates objects through a factory method instead of direct construction logic.",
    "allows garbage collection": "Means the reference does not keep the target object alive on its own.",
    "strict floating point": "Forces floating-point calculations to follow consistent IEEE 754 behavior.",
    "runnable": "Represents a unit of work that a thread can execute.",
    "sum": "Adds all numeric elements in the stream and returns the total.",
    "of": "Creates an instance containing the provided value.",
    "permits": "Lists which subclasses are allowed to extend a sealed class.",
    "catch": "Handles an exception thrown from the try block.",
    "(int)": "Casts the value to int by dropping its decimal part.",
    "println": "Prints a value and then moves to a new line.",
    "case": "Starts a specific branch inside a switch statement.",
    "<>": "Is the diamond operator, which lets Java infer generic type arguments.",
    ";": "Terminates the statement because no class body is written after the declaration.",
    "<!doctype html>": "Declares the document as HTML5 and tells the browser to use standards mode.",
    "<img>": "Embeds an image and is a void element, so it does not need a closing tag.",
    "<container>": "Is not a standard HTML5 element.",
    "email": "Tells the browser the input should accept an email address.",
    "custom data storage": "Means data-* attributes store extra custom information on an element.",
    "accessibility description": "Means aria-label provides an accessible name for assistive technologies.",
    "better accessibility and seo": "Means semantic HTML gives structure and meaning that helps users, assistive tech, and search engines.",
    "semantic time representation": "Marks up a date or time in a machine-readable way.",
    "primary content area": "Identifies the main content of the document.",
    "collapsible content": "Creates content the user can expand or collapse.",
    "all of the above": "Indicates every listed choice describes the element or attribute correctly in this quiz.",
    "both srcset and sizes": "Work together so the browser can choose the best image resource for the layout.",
    "required": "Forces the field to be filled before the form can be submitted.",
    "pattern": "Checks the input value against a regular expression.",
    "loading": "Controls loading behavior such as lazy loading.",
    "autocomplete": "Lets the browser suggest and fill previously entered values.",
    "nonce": "Allows an inline script or style to pass a Content Security Policy check.",
    "article is standalone content": "Means an article can stand on its own, while a section groups related content.",
    "rem": "Is relative to the root element's font size.",
    "var()": "Reads the value of a CSS custom property.",
    "grayscale()": "Applies a grayscale filter effect.",
    "blur()": "Applies a blur filter effect.",
    "display:flex": "Sets display to flex so the element becomes a flex container.",
    "flex-grow": "Controls how much a flex item expands relative to other flex items.",
    "grid-template-columns": "Defines the number and size of grid columns.",
    "position:sticky": "Keeps the element in normal flow until it reaches its offset, then it sticks there.",
    "overflow": "Controls what happens when content does not fit inside the element box.",
    "box-shadow": "Draws a shadow around the element box.",
    "text-shadow": "Adds a shadow to the text itself.",
    "animation": "Applies a named animation and its timing settings.",
    "transition-duration": "Sets how long a transition takes.",
    "transition-delay": "Sets how long to wait before a transition starts.",
    "transition-timing-function": "Controls the speed curve of a transition.",
    "grid-area": "Assigns an item to a grid area by name or by line numbers.",
    "grid-row-start": "Sets the grid row line where the item starts.",
    "grid-column-start": "Sets the grid column line where the item starts.",
    "justify-content": "Distributes extra space along the main axis.",
    "grid-template-rows": "Defines the size of grid rows.",
    "repeat()": "Repeats a grid track pattern inside a grid template.",
    "cover": "Scales the image to cover the box while preserving aspect ratio.",
    "no-repeat": "Prevents a background image from tiling.",
    "uppercase": "Displays text in uppercase letters.",
    "hidden": "Clips overflow instead of showing it outside the box.",
    "both": "Applies the rule to both the left and right sides or clears both floats, depending on the property.",
    "pointer": "Shows a pointing-hand cursor for clickable UI.",
    "collapse": "Merges adjacent table borders into a single border model.",
    "black": "Is the black color value used in that declaration.",
    "1.5": "Sets the line height to one and a half times the font size.",
    "bold": "Uses a bold font weight.",
    "underline": "Draws a line under the text.",
    "circle": "Uses hollow circular bullets for list items.",
    "block": "Makes the element start on a new line and take the available width by default.",
    "relative": "Positions the element relative to its normal location.",
    "italic": "Uses an italic font style.",
    "red": "Sets the value to the color red.",
    "100%": "Makes the element size relative to the full available width.",
    "10": "Sets a higher stacking order than items with a lower z-index.",
    "push()": "Adds one or more elements to the end of an array and returns the new length.",
    "arr[0]": "Uses zero-based indexing, so index 0 accesses the first element.",
    "window": "Is the global browser object for the current tab or window.",
    "alert()": "Opens a simple browser alert dialog.",
    "break": "Exits the nearest loop or switch immediately.",
    "shift()": "Removes and returns the first element of an array.",
    "param=default": "Assigns a fallback value that is used when the caller omits that argument.",
    "for...in": "Iterates over an object's enumerable property names.",
    "() => {}": "Is arrow function syntax.",
    "str.length": "Returns the number of characters in the string.",
    "stoppropagation()": "Stops the event from bubbling to ancestor elements.",
    "parseint()": "Parses text and returns an integer number.",
    "a function with access to its scope": "Describes a closure, which keeps access to variables from its outer scope.",
    "static": "Describes behavior that stays tied to the surrounding lexical context instead of creating a new this value.",
    "creates an object": "Means the constructor call creates a new object instance.",
    "object inheritance chain": "Describes how JavaScript objects inherit through linked prototypes.",
    "by capturing child events at parent": "Uses one parent listener to handle events from matching child elements through bubbling.",
    "different ways to invoke functions": "Describes call(), apply(), and bind(), which all control how a function is invoked and what this refers to.",
    "returns a promise": "Means the async function always returns a Promise object.",
    "waits until resolved": "Means await pauses the async function until the awaited value settles.",
    "async mechanism": "Describes the event loop that schedules asynchronous callbacks and tasks.",
    "moves vars and functions to top": "Describes hoisting, where declarations are processed before the code runs.",
    "undefined exists but not defined doesn’t": "Means undefined is a real value, while a not defined variable does not exist in scope.",
    "return iterator": "Means a generator function returns an iterator that yields values over time.",
    "unique identifiers": "Describes Symbols, which create unique primitive values often used as property keys.",
    "weakmap allows garbage collection": "Means WeakMap keys are weakly held, so unused object keys can be garbage collected.",
    "seal allows edits but not add/remove": "Means Object.seal() keeps existing properties but blocks adding or deleting them.",
    "perform object operations": "Describes Reflect, which exposes object operations as functions.",
    "intercepts operations": "Describes Proxy, which can trap operations like property access or assignment.",
    "all waits all, race waits first": "Means Promise.all waits for every promise, while Promise.race settles on the first result.",
    "micro run first": "Means microtasks are processed before the next macrotask in the event loop.",
    "no prototype": "Means Object.create(null) creates an object without inheriting from Object.prototype.",
    "next": "Advances a generator and returns the next iteration result object.",
    "callee": "Refers to the currently executing function from arguments, though it is deprecated in strict mode.",
    "prototype": "Is the object used for inherited properties and methods.",
    "size": "Returns the number of entries in a Map or Set.",
    "find": "Returns the first array element that matches the test function.",
    "value": "Holds the stored value in a property descriptor.",
    "defineproperty": "Defines or redefines a single property using a descriptor.",
    "freeze": "Prevents an object from being extended or mutated.",
    "bytes_per_element": "Tells how many bytes each element in a typed array uses.",
    "pi": "Is the mathematical constant representing the ratio of a circle's circumference to its diameter.",
    "math": "Is the built-in object that provides mathematical constants and functions.",
    "#": "Starts a single-line comment in Python.",
    "input": "Reads user input and returns it as a string.",
    "4 spaces": "Is the standard indentation style used in Python code.",
    "abs": "Returns the absolute value of a number.",
    "zip": "Pairs items from multiple iterables position by position.",
    "filter": "Keeps only the items that satisfy a condition.",
    "@staticmethod": "Marks a class method that does not need self or cls.",
    "id": "Returns an object's identity value for the current runtime.",
    "eval": "Evaluates a Python expression from a string.",
    "__import__": "Imports a module dynamically using its name at runtime.",
    "asyncio.create_task": "Schedules a coroutine to run concurrently as a task.",
    "process": "Represents a separate process started by the multiprocessing module.",
    "tracemalloc": "Tracks memory allocations so Python memory usage can be analyzed.",
    "yield": "Produces a value from a generator without ending the function.",
    "variable arguments": "Means *args collects extra positional arguments into a tuple.",
    "with": "Starts a context manager so setup and cleanup happen automatically.",
    "get": "Returns a value for a key and can supply a default if the key is missing.",
    "format": "Inserts values into placeholders in a string.",
    "local variables dict": "Means vars() with no argument returns the current local namespace dictionary.",
    "global namespace dict": "Means globals() returns the current module's global namespace dictionary.",
    "executes code": "Means exec() runs Python code dynamically.",
    "range": "Generates a sequence of numbers, often for loops.",
    "enumerate": "Returns pairs of index and value while iterating.",
    "counter": "Counts hashable items and stores their frequencies.",
    "append": "Adds one item to the end of a list.",
    "pop": "Removes and returns an item; without an index it uses the last one.",
    "upper": "Returns an uppercase version of the string.",
    "&": "Computes the intersection shared by two sets.",
    "sqrt": "Returns the square root of a number.",
    "zerodivisionerror": "Is the exception raised when code divides by zero.",
    "/": "Performs true division in Python.",
    "__init__": "Is the initializer method that runs when a new object is created."
};
const contextualAnswerExplanations = {
    "html:class": "Groups elements under a reusable class name so CSS or JavaScript can target them.",
    "html:type": "Specifies what kind of control or behavior the element should use.",
    "html:method": "Sets how form data is submitted, such as GET or POST.",
    "html:name": "Names the form control so its value is included during form submission.",
    "html:action": "Sets the URL where the form sends its submitted data.",
    "html:for": "Connects a label to the form control whose id matches this value.",
    "html:meta": "Declares document metadata such as charset or viewport information.",
    "html:title": "Defines the text shown in the browser tab and document title.",
    "html:li": "Defines a list item inside an ordered or unordered list.",
    "html:td": "Defines a standard data cell inside a table row.",
    "html:style": "Adds inline CSS directly to the element.",
    "html:text": "Defines a standard single-line text input.",
    "html:static": "Is the default position value, which keeps the element in normal document flow.",
    "java:of": "Creates an Optional or immutable collection item list from the provided values, depending on the type being called.",
    "java:valueof": "Converts the input into the requested wrapper or string representation.",
    "java:copyvalueof": "Creates a String from a character array.",
    "java:exists": "Checks whether the given file path exists.",
    "java:sort": "Sorts the array into ascending order.",
    "javascript:get": "Reads a property value from the target object.",
    "javascript:has": "Checks whether the target object contains the specified property.",
    "javascript:size": "Returns the number of entries in a Map or Set.",
    "javascript:tostring": "Converts the value to its string form.",
    "javascript:name": "Returns the function, method, or constructor name.",
    "javascript:length": "Returns the number of expected parameters or the collection size, depending on the object.",
    "javascript:all": "Starts a Promise that waits for every input Promise to resolve.",
    "python:get": "Returns the dictionary value for a key and can use a default when the key is missing.",
    "python:sort": "Sorts the list in place.",
    "python:count": "Returns how many times the given value or substring appears.",
    "python:choice": "Returns a random item from a non-empty sequence.",
    "python:setdefault": "Returns the existing value for a key or inserts a default if the key is missing."
};
const w3SchoolsSourcePages = {
    htmlReference: { label: "W3Schools: HTML Tag Reference", url: "https://www.w3schools.com/tags/default.asp" },
    javaSyntax: { label: "W3Schools: Java Syntax", url: "https://www.w3schools.com/java/java_syntax.asp" },
    javaReference: { label: "W3Schools: Java Reference", url: "https://www.w3schools.com/java/java_ref_reference.asp" },
    javaComments: { label: "W3Schools: Java Comments", url: "https://www.w3schools.com/java/java_comments.asp" },
    javaDataTypes: { label: "W3Schools: Java Data Types", url: "https://www.w3schools.com/java/java_data_types.asp" },
    javaOperators: { label: "W3Schools: Java Operators", url: "https://www.w3schools.com/java/java_operators.asp" },
    javaStrings: { label: "W3Schools: Java Strings", url: "https://www.w3schools.com/java/java_strings.asp" },
    javaInheritance: { label: "W3Schools: Java Inheritance", url: "https://www.w3schools.com/java/java_inheritance.asp" },
    javaInterface: { label: "W3Schools: Java Interfaces", url: "https://www.w3schools.com/java/java_interface.asp" },
    javaEncapsulation: { label: "W3Schools: Java Encapsulation", url: "https://www.w3schools.com/java/java_encapsulation.asp" },
    javaModifiers: { label: "W3Schools: Java Modifiers", url: "https://www.w3schools.com/java/java_modifiers.asp" },
    javaArrayList: { label: "W3Schools: Java ArrayList", url: "https://www.w3schools.com/java/java_arraylist.asp" },
    javaBreak: { label: "W3Schools: Java Break and Continue", url: "https://www.w3schools.com/java/java_break.asp" },
    javaBooleans: { label: "W3Schools: Java Booleans", url: "https://www.w3schools.com/java/java_booleans.asp" },
    javaInnerClasses: { label: "W3Schools: Java Inner Classes", url: "https://www.w3schools.com/java/java_inner_classes.asp" },
    javaOop: { label: "W3Schools: Java OOP", url: "https://www.w3schools.com/java/java_oop.asp" },
    htmlAttributes: { label: "W3Schools: HTML Attributes", url: "https://www.w3schools.com/html/html_attributes.asp" },
    htmlImages: { label: "W3Schools: HTML Images", url: "https://www.w3schools.com/html/html_images.asp" },
    htmlId: { label: "W3Schools: HTML id Attribute", url: "https://www.w3schools.com/html/html_id.asp" },
    htmlAccessibility: { label: "W3Schools: HTML Accessibility", url: "https://www.w3schools.com/html/html_accessibility.asp" },
    cssReference: { label: "W3Schools: CSS Reference", url: "https://www.w3schools.com/cssref/" },
    cssFlexbox: { label: "W3Schools: CSS Flexbox", url: "https://www.w3schools.com/css/css3_flexbox.asp" },
    cssMargin: { label: "W3Schools: CSS Margin", url: "https://www.w3schools.com/css/css_margin.asp" },
    cssPadding: { label: "W3Schools: CSS Padding", url: "https://www.w3schools.com/css/css_padding.asp" },
    cssDisplay: { label: "W3Schools: CSS Display", url: "https://www.w3schools.com/css/css_display_visibility.asp" },
    cssColors: { label: "W3Schools: CSS Colors", url: "https://www.w3schools.com/css/css_colors.asp" },
    cssBackground: { label: "W3Schools: CSS Backgrounds", url: "https://www.w3schools.com/css/css_background.asp" },
    jsReference: { label: "W3Schools: JavaScript Reference", url: "https://www.w3schools.com/jsref/jsref_reference.asp" },
    jsVariables: { label: "W3Schools: JavaScript Variables", url: "https://www.w3schools.com/js/js_variables.asp" },
    jsFunctions: { label: "W3Schools: JavaScript Functions", url: "https://www.w3schools.com/js/js_functions.asp" },
    jsTiming: { label: "W3Schools: JavaScript Timing Events", url: "https://www.w3schools.com/js/js_timing.asp" },
    jsArrayMethods: { label: "W3Schools: JavaScript Array Methods", url: "https://www.w3schools.com/js/js_array_methods.asp" },
    jsArraySearch: { label: "W3Schools: JavaScript Array Search", url: "https://www.w3schools.com/js/js_array_search.asp" },
    jsAsync: { label: "W3Schools: JavaScript Async", url: "https://www.w3schools.com/js/js_async.asp" },
    jsJsonParse: { label: "W3Schools: JavaScript JSON.parse()", url: "https://www.w3schools.com/js/js_json_parse.asp" },
    jsJsonStringify: { label: "W3Schools: JavaScript JSON.stringify()", url: "https://www.w3schools.com/js/js_json_stringify.asp" },
    jsClasses: { label: "W3Schools: JavaScript Classes", url: "https://www.w3schools.com/js/js_classes.asp" },
    jsRegExp: { label: "W3Schools: JavaScript RegExp", url: "https://www.w3schools.com/js/js_regexp.asp" },
    pythonReference: { label: "W3Schools: Python Reference", url: "https://www.w3schools.com/python/python_reference.asp" },
    pythonDataTypes: { label: "W3Schools: Python Data Types", url: "https://www.w3schools.com/python/python_datatypes.asp" },
    pythonFunctions: { label: "W3Schools: Python Functions", url: "https://www.w3schools.com/python/python_functions.asp" },
    pythonVariables: { label: "W3Schools: Python Variables", url: "https://www.w3schools.com/python/python_variables.asp" },
    pythonBooleans: { label: "W3Schools: Python Booleans", url: "https://www.w3schools.com/python/python_booleans.asp" },
    pythonNone: { label: "W3Schools: Python None", url: "https://www.w3schools.com/python/python_none.asp" },
    pythonClasses: { label: "W3Schools: Python Classes", url: "https://www.w3schools.com/python/python_classes.asp" },
    htmlSemantic: { label: "W3Schools: HTML Semantic Elements", url: "https://www.w3schools.com/html/html5_semantic_elements.asp" },
    htmlForms: { label: "W3Schools: HTML Forms", url: "https://www.w3schools.com/html/html_forms.asp" },
    htmlFormAttributes: { label: "W3Schools: HTML Form Attributes", url: "https://www.w3schools.com/html/html_forms_attributes.asp" },
    htmlInputTypes: { label: "W3Schools: HTML Input Types", url: "https://www.w3schools.com/html/html_form_input_types.asp" },
    htmlInputAttributes: { label: "W3Schools: HTML Input Attributes", url: "https://www.w3schools.com/html/html_form_attributes.asp" },
    cssUnits: { label: "W3Schools: CSS Units", url: "https://www.w3schools.com/css/css_units.asp" },
    jsClosures: { label: "W3Schools: JavaScript Closures", url: "https://www.w3schools.com/js/js_function_closures.asp" },
    jsThis: { label: "W3Schools: JavaScript this Keyword", url: "https://www.w3schools.com/js/js_function_this.asp" },
    jsHoisting: { label: "W3Schools: JavaScript Hoisting", url: "https://www.w3schools.com/js/js_hoisting.asp" },
    jsPrototypes: { label: "W3Schools: JavaScript Object Prototypes", url: "https://www.w3schools.com/js/js_object_prototypes.asp" },
    jsFunctionReference: { label: "W3Schools: JavaScript Function Reference", url: "https://www.w3schools.com/js/js_function_reference.asp" }
};
const geeksForGeeksSourcePages = {
    javaKeywords: { label: "GeeksforGeeks: Important Keywords in Java", url: "https://www.geeksforgeeks.org/java/important-keywords-java/" },
    javaLambda: { label: "GeeksforGeeks: Java Lambda Expressions", url: "https://www.geeksforgeeks.org/java/lambda-expressions-java-8/" },
    javaOptionalOf: { label: "GeeksforGeeks: Optional of() Method in Java", url: "https://www.geeksforgeeks.org/java/optional-of-method-in-java-with-examples/" },
    javaIntStreamSum: { label: "GeeksforGeeks: IntStream sum() in Java", url: "https://www.geeksforgeeks.org/java/intstream-sum-java/" },
    javaCompletableFuture: { label: "GeeksforGeeks: CompletableFuture in Java", url: "https://www.geeksforgeeks.org/java/completablefuture-in-java/" },
    javaWeakReference: { label: "GeeksforGeeks: WeakReference Class in Java", url: "https://www.geeksforgeeks.org/java/java-lang-ref-weakreference-class-in-java/" },
    javaReflection: { label: "GeeksforGeeks: Reflection in Java", url: "https://www.geeksforgeeks.org/java/reflection-in-java/" },
    javaAnnotations: { label: "GeeksforGeeks: Annotations in Java", url: "https://www.geeksforgeeks.org/annotations-in-java/" },
    javaSealedClasses: { label: "GeeksforGeeks: Sealed Class in Java", url: "https://www.geeksforgeeks.org/java/sealed-class-in-java/" },
    jsEventDelegation: { label: "GeeksforGeeks: Event Delegation in JavaScript", url: "https://www.geeksforgeeks.org/javascript/event-delegation-in-javascript/" },
    jsProxy: { label: "GeeksforGeeks: JavaScript Proxy/Handler", url: "https://www.geeksforgeeks.org/javascript/javascript-proxy-handler/" },
    jsReflect: { label: "GeeksforGeeks: JavaScript Reflect", url: "https://www.geeksforgeeks.org/javascript/javascript-reflect/" },
    jsWeakMap: { label: "GeeksforGeeks: JavaScript WeakMap", url: "https://www.geeksforgeeks.org/javascript/javascript-weakmap/" },
    jsSymbol: { label: "GeeksforGeeks: JavaScript Symbol Reference", url: "https://www.geeksforgeeks.org/javascript/javascript-symbol-reference/" },
    jsMicrotasks: { label: "GeeksforGeeks: JavaScript Microtasks and Macrotasks", url: "https://www.geeksforgeeks.org/what-are-the-microtask-and-macrotask-within-an-event-loop-in-javascript/" },
    pythonStaticMethod: { label: "GeeksforGeeks: Python @staticmethod", url: "https://www.geeksforgeeks.org/python/python-staticmethod/" },
    pythonAsyncio: { label: "GeeksforGeeks: asyncio in Python", url: "https://www.geeksforgeeks.org/python/asyncio-in-python/" },
    pythonImport: { label: "GeeksforGeeks: __import__() function in Python", url: "https://www.geeksforgeeks.org/python-__import__-function/" },
    pythonMemory: { label: "GeeksforGeeks: Monitoring Memory Usage of a Running Python Program", url: "https://www.geeksforgeeks.org/python/monitoring-memory-usage-of-a-running-python-program/" },
    pythonMultiprocessing: { label: "GeeksforGeeks: Multiprocessing in Python", url: "https://www.geeksforgeeks.org/python/multiprocessing-python-set-1/" }
};

function buildGuide(explanation, source) {
    return {
        explanation,
        sourceLabel: source?.label || "W3Schools",
        sourceUrl: source?.url || ""
    };
}

const w3SchoolsAnswerGuides = {
    "java:public static void main(string[] args)": buildGuide("This declaration is correct because W3Schools shows that Java starts a standalone program in the main() method, and it must be public, static, and able to receive command-line arguments.", w3SchoolsSourcePages.javaSyntax),
    "java:new": buildGuide("This is correct because W3Schools explains that Java uses the new keyword to create an object from a class before you can work with that instance.", w3SchoolsSourcePages.javaSyntax),
    "java:int": buildGuide("This is correct because W3Schools says int is used for storing whole numbers, unlike double which is used for decimals.", w3SchoolsSourcePages.javaDataTypes),
    "java:double": buildGuide("This is correct because W3Schools describes double as a numeric type for values with decimal points.", w3SchoolsSourcePages.javaDataTypes),
    "java:string": buildGuide("This is correct because W3Schools explains that Java String values store text rather than numeric data.", w3SchoolsSourcePages.javaStrings),
    "java:char": buildGuide("This is correct because W3Schools lists char as the Java type for a single character.", w3SchoolsSourcePages.javaDataTypes),
    "java:boolean": buildGuide("This is correct because W3Schools shows that boolean stores only true or false values.", w3SchoolsSourcePages.javaBooleans),
    "java://": buildGuide("This is correct because W3Schools shows that two forward slashes start a single-line comment in Java, so the rest of that line is ignored by the compiler.", w3SchoolsSourcePages.javaComments),
    "java:system": buildGuide("This is correct because W3Schools uses System.out.println() to print output, showing that System gives access to standard output.", w3SchoolsSourcePages.javaSyntax),
    "java:final": buildGuide("This is correct because W3Schools explains that final is the modifier used when a value should not be changed after it is assigned.", w3SchoolsSourcePages.javaModifiers),
    "java:==": buildGuide("This is correct because W3Schools lists == as the Java equality operator used to compare whether two values are equal.", w3SchoolsSourcePages.javaOperators),
    "java:extends": buildGuide("This is correct because W3Schools shows that Java uses extends when one class inherits from another.", w3SchoolsSourcePages.javaInheritance),
    "java:implements": buildGuide("This is correct because W3Schools shows that a class uses implements when it follows an interface.", w3SchoolsSourcePages.javaInterface),
    "java:super": buildGuide("This is correct because W3Schools explains that super is used to refer to members in the parent class.", w3SchoolsSourcePages.javaInheritance),
    "java:private": buildGuide("This is correct because W3Schools explains that private members can only be accessed inside the same class.", w3SchoolsSourcePages.javaEncapsulation),
    "java:public": buildGuide("This is correct because W3Schools shows that public members can be accessed from other classes.", w3SchoolsSourcePages.javaModifiers),
    "java:protected": buildGuide("This is correct because W3Schools explains that protected gives access through inheritance.", w3SchoolsSourcePages.javaModifiers),
    "java:arraylist": buildGuide("This is correct because W3Schools describes ArrayList as a resizable array that allows duplicate items and keeps insertion order.", w3SchoolsSourcePages.javaArrayList),
    "java:tostring()": buildGuide("This is correct because W3Schools shows that toString() is the method Java uses to return an object's string representation.", w3SchoolsSourcePages.javaStrings),
    "java:equals()": buildGuide("This is correct because W3Schools explains that equals() compares the contents of strings, while == compares references.", w3SchoolsSourcePages.javaStrings),
    "java:length()": buildGuide("This is correct because W3Schools shows that length() returns the number of characters in a Java string.", w3SchoolsSourcePages.javaStrings),
    "java:do-while": buildGuide("This is correct because W3Schools explains that a do...while loop runs its block once before checking the condition.", w3SchoolsSourcePages.javaBreak),
    "java:object-oriented": buildGuide("This is correct because W3Schools describes Java as an object-oriented language built around classes and objects.", w3SchoolsSourcePages.javaOop),
    "java:none": buildGuide("This is correct because W3Schools shows that Java does not use an inner keyword for a non-static nested class; you simply declare a class inside another class.", w3SchoolsSourcePages.javaInnerClasses),
    "html:alt": buildGuide("This is correct because W3Schools explains that the alt attribute provides alternative text for an image, especially when the image cannot be displayed or for screen readers.", w3SchoolsSourcePages.htmlAccessibility),
    "html:aria-label": buildGuide("This is correct because W3Schools accessibility guidance shows that aria-label gives an accessible name when visible text is missing or not enough.", w3SchoolsSourcePages.htmlAccessibility),
    "html:href": buildGuide("This is correct because W3Schools explains that href specifies the destination URL of a link.", w3SchoolsSourcePages.htmlAttributes),
    "html:src": buildGuide("This is correct because W3Schools shows that src points to the file or resource an element should load, such as an image.", w3SchoolsSourcePages.htmlImages),
    "html:id": buildGuide("This is correct because W3Schools explains that id identifies one specific HTML element with a unique value.", w3SchoolsSourcePages.htmlId),
    "css:flex": buildGuide("This is correct because W3Schools explains that display: flex turns an element into a flex container so its children can be laid out with flexbox.", w3SchoolsSourcePages.cssFlexbox),
    "css:margin": buildGuide("This is correct because W3Schools says margin creates space outside the border of an element.", w3SchoolsSourcePages.cssMargin),
    "css:padding": buildGuide("This is correct because W3Schools says padding creates space between an element's content and its border.", w3SchoolsSourcePages.cssPadding),
    "css:color": buildGuide("This is correct because W3Schools explains that the color property sets the text color.", w3SchoolsSourcePages.cssColors),
    "css:background-color": buildGuide("This is correct because W3Schools explains that background-color sets the background color of an element.", w3SchoolsSourcePages.cssBackground),
    "css:display": buildGuide("This is correct because W3Schools explains that display controls how an element is shown in the layout, such as block, inline, or flex.", w3SchoolsSourcePages.cssDisplay),
    "javascript:let": buildGuide("This is correct because W3Schools explains that let declares block-scoped variables.", w3SchoolsSourcePages.jsVariables),
    "javascript:const": buildGuide("This is correct because W3Schools explains that const declares block-scoped variables that cannot be reassigned.", w3SchoolsSourcePages.jsVariables),
    "javascript:function": buildGuide("This is correct because W3Schools explains that a JavaScript function is a block of code designed to perform a particular task.", w3SchoolsSourcePages.jsFunctions),
    "javascript:settimeout()": buildGuide("This is correct because W3Schools shows that setTimeout() runs code once after a specified delay.", w3SchoolsSourcePages.jsTiming),
    "javascript:concat()": buildGuide("This is correct because W3Schools shows that concat() joins arrays and returns a new array instead of changing the original one.", w3SchoolsSourcePages.jsArrayMethods),
    "javascript:indexof()": buildGuide("This is correct because W3Schools explains that indexOf() returns the position of a value in an array or string, or -1 if it is not found.", w3SchoolsSourcePages.jsArraySearch),
    "javascript:promise.resolve()": buildGuide("This is correct because W3Schools shows that Promise.resolve() creates a promise that is already resolved.", w3SchoolsSourcePages.jsAsync),
    "javascript:async": buildGuide("This is correct because W3Schools explains that async makes a function return a promise and lets you use await inside it.", w3SchoolsSourcePages.jsAsync),
    "javascript:await": buildGuide("This is correct because W3Schools explains that await pauses inside an async function until the promise settles.", w3SchoolsSourcePages.jsAsync),
    "javascript:regexp": buildGuide("This is correct because W3Schools explains that RegExp is JavaScript's object for working with regular expressions.", w3SchoolsSourcePages.jsRegExp),
    "javascript:json.parse()": buildGuide("This is correct because W3Schools shows that JSON.parse() converts JSON text into a JavaScript object or value.", w3SchoolsSourcePages.jsJsonParse),
    "javascript:json.stringify()": buildGuide("This is correct because W3Schools shows that JSON.stringify() converts a JavaScript value into a JSON string.", w3SchoolsSourcePages.jsJsonStringify),
    "javascript:class": buildGuide("This is correct because W3Schools explains that classes are templates for creating JavaScript objects.", w3SchoolsSourcePages.jsClasses),
    "javascript:===": buildGuide("This is correct because W3Schools explains that === compares both value and type.", w3SchoolsSourcePages.jsVariables),
    "javascript:a function with access to its scope": buildGuide("This is correct because a closure keeps access to variables from the scope where the function was created.", w3SchoolsSourcePages.jsClosures),
    "javascript:static": buildGuide("This is correct because arrow functions do not create their own this value. They keep the this from the surrounding scope.", w3SchoolsSourcePages.jsThis),
    "javascript:object inheritance chain": buildGuide("This is correct because the prototype chain is the linked path JavaScript follows when it looks up inherited properties.", w3SchoolsSourcePages.jsPrototypes),
    "javascript:by capturing child events at parent": buildGuide("This is correct because event delegation uses one parent listener and handles child events as they bubble upward.", geeksForGeeksSourcePages.jsEventDelegation),
    "javascript:returns a promise": buildGuide("This is correct because an async function always returns a Promise, even when you return a plain value.", w3SchoolsSourcePages.jsAsync),
    "javascript:waits until resolved": buildGuide("This is correct because await pauses the async function until the awaited Promise settles and gives back its result.", w3SchoolsSourcePages.jsAsync),
    "javascript:async mechanism": buildGuide("This is correct because the event loop coordinates queued asynchronous work without blocking the main JavaScript thread.", geeksForGeeksSourcePages.jsMicrotasks),
    "javascript:moves vars and functions to top": buildGuide("This is correct because hoisting means declarations are processed before the rest of the code executes.", w3SchoolsSourcePages.jsHoisting),
    "javascript:undefined exists but not defined doesn’t": buildGuide("This is correct because undefined is a real JavaScript value, while a not defined variable does not exist in the current scope.", w3SchoolsSourcePages.jsVariables),
    "javascript:return iterator": buildGuide("This is correct because a generator function returns an iterator object that produces values one at a time with next().", w3SchoolsSourcePages.jsFunctions),
    "javascript:unique identifiers": buildGuide("This is correct because Symbol creates unique primitive values, which are often used as non-colliding property keys.", geeksForGeeksSourcePages.jsSymbol),
    "javascript:weakmap allows garbage collection": buildGuide("This is correct because WeakMap holds object keys weakly, so unused keys can still be garbage collected.", geeksForGeeksSourcePages.jsWeakMap),
    "javascript:seal allows edits but not add/remove": buildGuide("This is correct because Object.seal() keeps existing properties but blocks adding or deleting properties.", w3SchoolsSourcePages.jsReference),
    "javascript:perform object operations": buildGuide("This is correct because Reflect exposes object operations like get, set, and has as function calls.", geeksForGeeksSourcePages.jsReflect),
    "javascript:intercepts operations": buildGuide("This is correct because Proxy can trap operations like property reads, writes, and function calls.", geeksForGeeksSourcePages.jsProxy),
    "javascript:all waits all, race waits first": buildGuide("This is correct because Promise.all waits for every Promise, while Promise.race settles as soon as the first Promise settles.", w3SchoolsSourcePages.jsAsync),
    "javascript:micro run first": buildGuide("This is correct because microtasks run before the next macrotask is taken from the event loop queue.", geeksForGeeksSourcePages.jsMicrotasks),
    "javascript:no prototype": buildGuide("This is correct because Object.create(null) creates an object that does not inherit from Object.prototype.", w3SchoolsSourcePages.jsPrototypes),
    "java:prevents caching": buildGuide("This is correct because volatile forces reads and writes to go through main memory so thread updates remain visible across threads.", geeksForGeeksSourcePages.javaKeywords),
    "java:excludes from serialization": buildGuide("This is correct because transient marks a field so it is skipped when the object is serialized.", geeksForGeeksSourcePages.javaKeywords),
    "java:functional interface": buildGuide("This is correct because a functional interface has exactly one abstract method, which is why a lambda expression can implement it.", geeksForGeeksSourcePages.javaLambda),
    "java:runtime inspection": buildGuide("This is correct because reflection lets Java inspect classes, methods, fields, and annotations at runtime.", geeksForGeeksSourcePages.javaReflection),
    "java:asynchronous programming": buildGuide("This is correct because CompletableFuture is used to run tasks asynchronously and combine future results.", geeksForGeeksSourcePages.javaCompletableFuture),
    "java:allows garbage collection": buildGuide("This is correct because a WeakReference does not keep the target object strongly reachable.", geeksForGeeksSourcePages.javaWeakReference),
    "java:@deprecated": buildGuide("This is correct because @Deprecated marks older code so the compiler can warn that a better replacement should be used.", geeksForGeeksSourcePages.javaAnnotations),
    "python:def": buildGuide("This is correct because W3Schools shows that Python uses def to define a function.", w3SchoolsSourcePages.pythonFunctions),
    "python:print()": buildGuide("This is correct because W3Schools uses print() to display output in Python examples.", w3SchoolsSourcePages.pythonFunctions),
    "python:class": buildGuide("This is correct because W3Schools explains that Python uses the class keyword to create a class.", w3SchoolsSourcePages.pythonClasses),
    "python:none": buildGuide("This is correct because W3Schools explains that None represents the absence of a value.", w3SchoolsSourcePages.pythonNone),
    "python:true": buildGuide("This is correct because W3Schools explains that Python Boolean values are True and False.", w3SchoolsSourcePages.pythonBooleans),
    "python:false": buildGuide("This is correct because W3Schools explains that Python Boolean values are True and False.", w3SchoolsSourcePages.pythonBooleans),
    "python:@staticmethod": buildGuide("This is correct because @staticmethod creates a method that does not receive self or cls automatically.", geeksForGeeksSourcePages.pythonStaticMethod),
    "python:asyncio.create_task": buildGuide("This is correct because asyncio.create_task() schedules a coroutine to run concurrently as a Task.", geeksForGeeksSourcePages.pythonAsyncio),
    "python:__import__": buildGuide("This is correct because __import__() loads a module dynamically using its name.", geeksForGeeksSourcePages.pythonImport),
    "python:tracemalloc": buildGuide("This is correct because tracemalloc tracks Python memory allocations for memory analysis.", geeksForGeeksSourcePages.pythonMemory),
    "python:process": buildGuide("This is correct because the multiprocessing Process class starts work in a separate process.", geeksForGeeksSourcePages.pythonMultiprocessing)
};

function setQuizBoxState(isActive) {
    const quizBox = document.getElementById("quiz-box");
    if (quizBox) {
        quizBox.classList.toggle("quiz-active", isActive);
    }
}

function normalizeDefinitionKey(value) {
    return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function stripQuestionMarkup(value) {
    return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function trimSentence(value) {
    return String(value).trim().replace(/[?.!]+$/, "");
}

function lowercaseFirst(value) {
    const text = String(value).trim();
    return text ? text.charAt(0).toLowerCase() + text.slice(1) : "";
}

function chooseBeVerb(value) {
    return /\band\b|^both\b/i.test(String(value).trim()) ? "are" : "is";
}

function fillQuestionBlank(questionText, correctAnswer) {
    return String(questionText).replace(/_{3,4}/, correctAnswer).replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getStoredExplanationText(normalizedAnswer) {
    return contextualAnswerExplanations[`${selectedLang}:${normalizedAnswer}`]
        || answerExplanations[normalizedAnswer]
        || "";
}

function getStoredAnswerPhrase(normalizedAnswer) {
    const phrase = getStoredExplanationText(normalizedAnswer);
    return phrase ? lowercaseFirst(String(phrase).replace(/[.]+$/, "")) : "";
}

function makeExplanationDirect(explanationText, correctAnswer) {
    let text = String(explanationText).trim();
    const sourcePrefix = "(?:W3Schools|GeeksforGeeks)";

    text = text.replace(new RegExp(`^${escapeRegExp(correctAnswer)}\\s+is\\s+correct\\s+because\\s*`, "i"), "");
    text = text.replace(/^This is correct because\s*/i, "");
    text = text.replace(new RegExp(`^${sourcePrefix} uses this keyword to\\s*`, "i"), "This keyword is used to ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses this keyword for\\s*`, "i"), "This keyword is used for ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses that method for\\s*`, "i"), "That method is used for ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses that class to\\s*`, "i"), "That class is used to ");
    text = text.replace(new RegExp(`^${sourcePrefix} identifies it as\\s*`, "i"), "It is ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses the ([a-z0-9:-]+) attribute on the `, "i"), "The $1 attribute is used on the ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses the ([a-z0-9:-]+) attribute for\\s*`, "i"), "The $1 attribute is used for ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses the ([a-z0-9<>/-]+) tag for\\s*`, "i"), "The $1 tag is used for ");
    text = text.replace(new RegExp(`^${sourcePrefix} uses the full property name\\s*`, "i"), "The full property name is ");
    text = text.replace(new RegExp(`^${sourcePrefix} (?:accessibility guidance )?(?:shows|explains|says|lists|describes|identifies)\\s+that\\s*`, "i"), "");
    text = text.replace(new RegExp(`^${sourcePrefix} (?:accessibility guidance )?(?:shows|explains|says|lists|describes|identifies)\\s*`, "i"), "");
    text = text.replace(new RegExp(`^${sourcePrefix} uses\\s*`, "i"), "");
    text = text.replace(new RegExp(`,?\\s*(?:based on|according to)\\s+[^.]*${sourcePrefix}[^.]*`, "i"), "");
    text = text.replace(new RegExp(`,?\\s*which matches how ${sourcePrefix}[^.]*`, "i"), "");
    text = text.replace(new RegExp(`,?\\s*in the ${sourcePrefix}[^.]*`, "i"), "");
    text = text.replace(new RegExp(sourcePrefix, "gi"), "");
    text = text.replace(/^that\s+/i, "");
    text = text.replace(/\s+,/g, ",");
    text = text.replace(/,\s*(?=[.!?]|$)/g, "");
    text = text.replace(/\s+/g, " ").trim();

    if (/^is\b/i.test(text)) {
        text = `it ${text}`;
    }

    if (text && !/[.!?]$/.test(text)) {
        text += ".";
    }

    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function getStoredW3SchoolsGuide(normalizedAnswer) {
    return w3SchoolsAnswerGuides[`${selectedLang}:${normalizedAnswer}`]
        || w3SchoolsAnswerGuides[normalizedAnswer]
        || null;
}

function getLikelyW3SchoolsSource(questionText, normalizedAnswer) {
    const cleanQuestion = String(questionText).toLowerCase();

    if (selectedLang === "java") {
        if (/reflection/.test(cleanQuestion) || normalizedAnswer === "runtime inspection") return geeksForGeeksSourcePages.javaReflection;
        if (/annotation|deprecated/.test(cleanQuestion) || normalizedAnswer === "@deprecated") return geeksForGeeksSourcePages.javaAnnotations;
        if (/sealed|permits/.test(cleanQuestion) || normalizedAnswer === "permits") return geeksForGeeksSourcePages.javaSealedClasses;
        if (/volatile|transient|strictfp|synchronization|synchronized|module system|enum declaration/.test(cleanQuestion) || ["prevents caching", "excludes from serialization", "strict floating point", "synchronized"].includes(normalizedAnswer)) return geeksForGeeksSourcePages.javaKeywords;
        if (/lambda|functional interface|method references|::|runnable/.test(cleanQuestion) || ["functional interface", "runnable", "::"].includes(normalizedAnswer)) return geeksForGeeksSourcePages.javaLambda;
        if (/optional/.test(cleanQuestion) || normalizedAnswer === "of") return geeksForGeeksSourcePages.javaOptionalOf;
        if (/intstream|stream operations|stream\(\)|\.sum\(\)/.test(cleanQuestion) || ["sum", "stream()"].includes(normalizedAnswer)) return geeksForGeeksSourcePages.javaIntStreamSum;
        if (/completablefuture|runasync|asynchronous/.test(cleanQuestion) || normalizedAnswer === "asynchronous programming") return geeksForGeeksSourcePages.javaCompletableFuture;
        if (/weakreference|garbage collected/.test(cleanQuestion) || normalizedAnswer === "allows garbage collection") return geeksForGeeksSourcePages.javaWeakReference;
        if (normalizedAnswer === "//" || /comment/.test(cleanQuestion)) return w3SchoolsSourcePages.javaComments;
        if (/main method|print to the console|system\.out|create an object/.test(cleanQuestion) || normalizedAnswer === "public static void main(string[] args)" || normalizedAnswer === "system" || normalizedAnswer === "new") return w3SchoolsSourcePages.javaSyntax;
        if (/data type|whole numbers|default value of int|char|boolean/.test(cleanQuestion) || ["int", "double", "char", "boolean"].includes(normalizedAnswer)) return w3SchoolsSourcePages.javaDataTypes;
        if (/operator|result of|output of|equality|%|integer division/.test(cleanQuestion) || normalizedAnswer === "==") return w3SchoolsSourcePages.javaOperators;
        if (/string|substring|charat|length|compare strings|tostring/.test(cleanQuestion) || ["string", "equals()", "length()", "tostring()"].includes(normalizedAnswer)) return w3SchoolsSourcePages.javaStrings;
        if (/inherit|subclass|parent class|super/.test(cleanQuestion) || ["extends", "super"].includes(normalizedAnswer)) return w3SchoolsSourcePages.javaInheritance;
        if (/interface|implements/.test(cleanQuestion) || normalizedAnswer === "implements") return w3SchoolsSourcePages.javaInterface;
        if (/private|protected|public|encapsulation|access modifier/.test(cleanQuestion) || ["private", "protected", "public"].includes(normalizedAnswer)) return w3SchoolsSourcePages.javaEncapsulation;
        if (/arraylist/.test(cleanQuestion) || normalizedAnswer === "arraylist") return w3SchoolsSourcePages.javaArrayList;
        if (/break|loop/.test(cleanQuestion) || normalizedAnswer === "do-while") return w3SchoolsSourcePages.javaBreak;
        if (/object-oriented/.test(cleanQuestion)) return w3SchoolsSourcePages.javaOop;
        return w3SchoolsSourcePages.javaSyntax;
    }

    if (selectedLang === "html") {
        if (/position property/.test(cleanQuestion) || normalizedAnswer === "static") return w3SchoolsSourcePages.cssReference;
        if (/semantic|<article>|<section>|<header>|<footer>|<main>|<aside>|<details>|<time>/.test(cleanQuestion) || ["custom data storage", "better accessibility and seo", "semantic time representation", "primary content area", "collapsible content", "article is standalone content", "all of the above"].includes(normalizedAnswer)) return w3SchoolsSourcePages.htmlSemantic;
        if (/input type|email/.test(cleanQuestion) || normalizedAnswer === "email") return w3SchoolsSourcePages.htmlInputTypes;
        if (/form validation|input pattern|autocomplete|lazy loading|required|pattern|autocomplete|loading/.test(cleanQuestion) || ["required", "pattern", "autocomplete", "loading"].includes(normalizedAnswer)) return w3SchoolsSourcePages.htmlInputAttributes;
        if (/form|action=|method=/.test(cleanQuestion) || ["action", "method", "name", "for", "type"].includes(normalizedAnswer)) return w3SchoolsSourcePages.htmlForms;
        if (normalizedAnswer === "alt" || /image|img/.test(cleanQuestion)) return w3SchoolsSourcePages.htmlImages;
        if (normalizedAnswer === "aria-label" || /accessibility|aria/.test(cleanQuestion)) return w3SchoolsSourcePages.htmlAccessibility;
        if (normalizedAnswer === "id" || /\bid\b/.test(cleanQuestion)) return w3SchoolsSourcePages.htmlId;
        return w3SchoolsSourcePages.htmlReference;
    }

    if (selectedLang === "css") {
        if (normalizedAnswer === "rem" || /root font size|relative to the root font size|css unit/.test(cleanQuestion)) return w3SchoolsSourcePages.cssUnits;
        if (normalizedAnswer === "flex" || /flex/.test(cleanQuestion)) return w3SchoolsSourcePages.cssFlexbox;
        if (normalizedAnswer === "margin" || /margin/.test(cleanQuestion)) return w3SchoolsSourcePages.cssMargin;
        if (normalizedAnswer === "padding" || /padding/.test(cleanQuestion)) return w3SchoolsSourcePages.cssPadding;
        if (normalizedAnswer === "background-color" || /background/.test(cleanQuestion)) return w3SchoolsSourcePages.cssBackground;
        if (normalizedAnswer === "color" || /text color|color/.test(cleanQuestion)) return w3SchoolsSourcePages.cssColors;
        return w3SchoolsSourcePages.cssReference;
    }

    if (selectedLang === "javascript") {
        if (/closure/.test(cleanQuestion) || normalizedAnswer === "a function with access to its scope") return w3SchoolsSourcePages.jsClosures;
        if (/this keyword|arrow functions?/.test(cleanQuestion) || normalizedAnswer === "static") return w3SchoolsSourcePages.jsThis;
        if (/prototype chain|object\.create\(null\)|prototype/.test(cleanQuestion) || ["object inheritance chain", "no prototype", "prototype"].includes(normalizedAnswer)) return w3SchoolsSourcePages.jsPrototypes;
        if (/event delegation|stop event bubbling/.test(cleanQuestion) || ["by capturing child events at parent", "stoppropagation()"].includes(normalizedAnswer)) return geeksForGeeksSourcePages.jsEventDelegation;
        if (/event loop|microtasks|macrotasks/.test(cleanQuestion) || ["async mechanism", "micro run first"].includes(normalizedAnswer)) return geeksForGeeksSourcePages.jsMicrotasks;
        if (/proxy/.test(cleanQuestion) || normalizedAnswer === "intercepts operations") return geeksForGeeksSourcePages.jsProxy;
        if (/reflect/.test(cleanQuestion) || normalizedAnswer === "perform object operations") return geeksForGeeksSourcePages.jsReflect;
        if (/weakmap/.test(cleanQuestion) || normalizedAnswer === "weakmap allows garbage collection") return geeksForGeeksSourcePages.jsWeakMap;
        if (/symbol/.test(cleanQuestion) || normalizedAnswer === "unique identifiers") return geeksForGeeksSourcePages.jsSymbol;
        if (/hoisting/.test(cleanQuestion) || normalizedAnswer === "moves vars and functions to top") return w3SchoolsSourcePages.jsHoisting;
        if (/call, apply, and bind|call\(|apply\(|bind\(/.test(cleanQuestion) || normalizedAnswer === "different ways to invoke functions") return w3SchoolsSourcePages.jsFunctionReference;
        if (["let", "const", "==="].includes(normalizedAnswer) || /variable|block-scoped|difference between == and ===/.test(cleanQuestion)) return w3SchoolsSourcePages.jsVariables;
        if (["function", "class"].includes(normalizedAnswer) || /function|class/.test(cleanQuestion)) return normalizedAnswer === "class" ? w3SchoolsSourcePages.jsClasses : w3SchoolsSourcePages.jsFunctions;
        if (normalizedAnswer === "settimeout()" || /delay|timeout/.test(cleanQuestion)) return w3SchoolsSourcePages.jsTiming;
        if (["concat()"].includes(normalizedAnswer) || /combine|map\(\)|join|array method/.test(cleanQuestion)) return w3SchoolsSourcePages.jsArrayMethods;
        if (["indexof()"].includes(normalizedAnswer) || /find the index|includes|index/.test(cleanQuestion)) return w3SchoolsSourcePages.jsArraySearch;
        if (["async", "await", "promise.resolve()"].includes(normalizedAnswer) || /promise|async|await/.test(cleanQuestion)) return w3SchoolsSourcePages.jsAsync;
        if (normalizedAnswer === "json.parse()" || /json\.parse/.test(cleanQuestion)) return w3SchoolsSourcePages.jsJsonParse;
        if (normalizedAnswer === "json.stringify()" || /json\.stringify/.test(cleanQuestion)) return w3SchoolsSourcePages.jsJsonStringify;
        if (normalizedAnswer === "regexp" || /regular expression|regexp/.test(cleanQuestion)) return w3SchoolsSourcePages.jsRegExp;
        return w3SchoolsSourcePages.jsReference;
    }

    if (selectedLang === "python") {
        if (/staticmethod/.test(cleanQuestion) || normalizedAnswer === "@staticmethod") return geeksForGeeksSourcePages.pythonStaticMethod;
        if (/asyncio|create_task/.test(cleanQuestion) || normalizedAnswer === "asyncio.create_task") return geeksForGeeksSourcePages.pythonAsyncio;
        if (/dynamic import|__import__/.test(cleanQuestion) || normalizedAnswer === "__import__") return geeksForGeeksSourcePages.pythonImport;
        if (/memory profiling|tracemalloc/.test(cleanQuestion) || normalizedAnswer === "tracemalloc") return geeksForGeeksSourcePages.pythonMemory;
        if (/process creation|multiprocessing/.test(cleanQuestion) || normalizedAnswer === "process") return geeksForGeeksSourcePages.pythonMultiprocessing;
        if (normalizedAnswer === "def" || /function/.test(cleanQuestion)) return w3SchoolsSourcePages.pythonFunctions;
        if (normalizedAnswer === "none" || /\bnone\b/.test(cleanQuestion)) return w3SchoolsSourcePages.pythonNone;
        if (["true", "false"].includes(normalizedAnswer) || /boolean/.test(cleanQuestion)) return w3SchoolsSourcePages.pythonBooleans;
        if (normalizedAnswer === "class" || /class/.test(cleanQuestion)) return w3SchoolsSourcePages.pythonClasses;
        if (normalizedAnswer === "print()" || /print/.test(cleanQuestion)) return w3SchoolsSourcePages.pythonFunctions;
        return w3SchoolsSourcePages.pythonReference;
    }

    return { label: "W3Schools", url: "https://www.w3schools.com/" };
}

function getCssSourceForProperty(propertyName) {
    const property = String(propertyName).toLowerCase();
    if (property === "display" || property.startsWith("visibility")) return w3SchoolsSourcePages.cssDisplay;
    if (property.startsWith("margin")) return w3SchoolsSourcePages.cssMargin;
    if (property.startsWith("padding")) return w3SchoolsSourcePages.cssPadding;
    if (property.includes("flex") || property === "justify-content" || property === "align-items" || property === "align-content") return w3SchoolsSourcePages.cssFlexbox;
    if (property.startsWith("background")) return w3SchoolsSourcePages.cssBackground;
    if (property === "color" || property === "caret-color") return w3SchoolsSourcePages.cssColors;
    return w3SchoolsSourcePages.cssReference;
}

function describeCssProperty(propertyName) {
    const property = String(propertyName).toLowerCase();
    const descriptions = {
        "color": "sets the text color",
        "display": "controls how the element is displayed in the layout",
        "position": "controls how the element is positioned",
        "font-weight": "controls how bold the text appears",
        "text-decoration": "controls visual decoration such as underlines",
        "list-style-type": "controls the bullet or marker style",
        "max-width": "limits how wide the element can become",
        "background-repeat": "controls whether a background image repeats",
        "text-transform": "controls the capitalization of text",
        "overflow": "controls what happens to content that does not fit",
        "margin-top": "adds outside space above the element",
        "padding-left": "adds inside space on the left side",
        "font-style": "controls italic or normal text styling",
        "background-size": "controls how a background image is sized",
        "clear": "controls how the element behaves around floated elements",
        "z-index": "controls stacking order",
        "cursor": "controls the mouse cursor style",
        "border-bottom": "styles the bottom border",
        "resize": "controls whether the element can be resized",
        "box-shadow": "adds a shadow around the element",
        "line-height": "controls the spacing between lines of text",
        "object-fit": "controls how replaced content such as images fits its box",
        "border-collapse": "controls whether table borders are combined",
        "text-align": "controls horizontal text alignment",
        "vertical-align": "controls vertical alignment",
        "border-radius": "rounds the element's corners",
        "min-height": "sets the minimum height",
        "float": "moves the element to one side",
        "word-spacing": "controls spacing between words",
        "letter-spacing": "controls spacing between letters",
        "opacity": "controls transparency",
        "justify-content": "controls how flex items are distributed",
        "align-items": "controls cross-axis alignment of flex items",
        "background-attachment": "controls whether a background scrolls with the page",
        "grid-template-columns": "defines the grid column layout",
        "flex-direction": "controls the main direction of flex items",
        "background-clip": "controls how far the background extends",
        "outline-style": "controls the outline style",
        "white-space": "controls how whitespace and line wrapping behave",
        "filter": "applies visual filter effects",
        "user-select": "controls whether text can be selected",
        "overflow-y": "controls vertical overflow",
        "text-shadow": "adds a shadow to text",
        "font-variant": "controls typographic variants such as small caps",
        "animation-duration": "controls how long the animation runs",
        "transform": "applies transforms such as rotate, scale, or translate",
        "transition-property": "defines which property transitions",
        "clip-path": "clips the visible area into a shape",
        "grid-gap": "sets spacing between grid tracks",
        "background-origin": "controls the box used to position the background",
        "writing-mode": "controls text flow direction",
        "hyphens": "controls hyphenation",
        "scroll-behavior": "controls scrolling animation",
        "column-count": "defines how many columns to use"
    };
    return descriptions[property] || "controls this part of the element's styling";
}

function getCodeQuestionGuide(questionData) {
    const correctAnswer = questionData.options[questionData.answer];
    const normalizedAnswer = normalizeDefinitionKey(correctAnswer);
    const rawQuestion = String(questionData.question).trim();
    const cleanQuestion = stripQuestionMarkup(rawQuestion);
    const likelySource = getLikelyW3SchoolsSource(rawQuestion, normalizedAnswer);
    const storedText = getStoredExplanationText(normalizedAnswer);
    const storedGuide = storedText
        ? buildGuide(formatStoredExplanation(correctAnswer, storedText), likelySource)
        : null;

    if (!(rawQuestion.includes("___") || rawQuestion.includes("____"))) {
        return null;
    }

    if (selectedLang === "html") {
        if (/<_{3,4}>|<\/_{3,4}>/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because W3Schools uses the ${correctAnswer} tag in that position in HTML markup.`, w3SchoolsSourcePages.htmlReference);
        }

        const attrMatch = rawQuestion.match(/<([a-z0-9]+)[^>]*\s_{3,4}(?==)/i);
        if (attrMatch) {
            const hostTag = attrMatch[1];
            const phrase = getStoredAnswerPhrase(normalizedAnswer);
            return buildGuide(
                phrase
                    ? `${correctAnswer} is correct because W3Schools uses the ${correctAnswer} attribute on the <${hostTag}> element there, and it ${phrase}.`
                    : `${correctAnswer} is correct because W3Schools uses the ${correctAnswer} attribute on the <${hostTag}> element in that position.`,
                getLikelyW3SchoolsSource(rawQuestion, normalizedAnswer)
            );
        }

        if (storedGuide) {
            return storedGuide;
        }

        return buildGuide(`${correctAnswer} is correct because it completes the markup as ${fillQuestionBlank(rawQuestion, correctAnswer)}.`, w3SchoolsSourcePages.htmlReference);
    }

    if (selectedLang === "css") {
        const propertyNameBlankMatch = rawQuestion.match(/\{\s*([a-z-]+)-_{3,4}\s*:/i);
        if (propertyNameBlankMatch) {
            const fullProperty = `${propertyNameBlankMatch[1]}-${correctAnswer}`;
            return buildGuide(`${correctAnswer} is correct because W3Schools uses the full property name ${fullProperty} in this CSS rule.`, getCssSourceForProperty(fullProperty));
        }

        const propertyValueMatch = rawQuestion.match(/\{\s*([a-z-]+)\s*:\s*_{3,4}\s*;/i);
        if (propertyValueMatch) {
            const propertyName = propertyValueMatch[1];
            return buildGuide(`${correctAnswer} is correct because W3Schools shows that ${correctAnswer} is a valid value for ${propertyName}, which ${describeCssProperty(propertyName)}.`, getCssSourceForProperty(propertyName));
        }

        if (storedGuide) {
            return storedGuide;
        }

        return buildGuide(`${correctAnswer} is correct because it completes the CSS rule as ${fillQuestionBlank(rawQuestion, correctAnswer)}.`, w3SchoolsSourcePages.cssReference);
    }

    if (selectedLang === "python") {
        if (/with open\(.+\)\s+as ___:/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because that variable receives the opened file object inside the with block.`, w3SchoolsSourcePages.pythonVariables);
        }
        if (/print\(___\)/i.test(cleanQuestion) && /^[a-z_][a-z0-9_]*$/i.test(correctAnswer)) {
            return buildGuide(`${correctAnswer} is correct because that is the variable being printed in the final expression.`, w3SchoolsSourcePages.pythonVariables);
        }
        if (/\bis ___$/i.test(cleanQuestion) && /^[a-z_][a-z0-9_]*$/i.test(correctAnswer)) {
            return buildGuide(`${correctAnswer} is correct because the identity check is comparing whether both names refer to the same object.`, w3SchoolsSourcePages.pythonVariables);
        }
        if (/for i in ___\(/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because W3Schools uses range() in for loops to generate a sequence of numbers to iterate over.`, w3SchoolsSourcePages.pythonFunctions);
        }
        if (/___ x:/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because W3Schools uses lambda to create a small anonymous function expression.`, w3SchoolsSourcePages.pythonFunctions);
        }
        if (/type\(x\) is ___|isinstance\(/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because W3Schools uses ${correctAnswer} as the type being checked in that expression.`, w3SchoolsSourcePages.pythonDataTypes);
        }
        if (/print\(2 ___ 3\)/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because W3Schools shows that ** is Python's exponent operator, so 2 ** 3 means 2 to the power of 3.`, w3SchoolsSourcePages.pythonReference);
        }
        if (storedGuide) {
            return storedGuide;
        }
        return buildGuide(`${correctAnswer} is correct because it completes the Python code as ${fillQuestionBlank(rawQuestion, correctAnswer)}.`, likelySource);
    }

    if (selectedLang === "javascript") {
        if (/=>/.test(correctAnswer) || /\(\)\s*=>/.test(correctAnswer)) {
            return buildGuide(`${correctAnswer} is correct because W3Schools shows that arrow functions use the => syntax.`, w3SchoolsSourcePages.jsFunctions);
        }
        if (/new B\(\)\.___/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because that property is inherited from the parent class and is available on the subclass instance.`, w3SchoolsSourcePages.jsClasses);
        }
        if (/g\.___\(\)\.value/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because next() advances the generator and returns the next yielded result object.`, w3SchoolsSourcePages.jsFunctions);
        }
        if (/arguments\.___/i.test(cleanQuestion) && normalizedAnswer === "callee") {
            return buildGuide(`${correctAnswer} is correct because arguments.callee refers to the currently executing function, although it is deprecated in strict mode.`, w3SchoolsSourcePages.jsFunctionReference);
        }
        if (/new proxy|proxy\(/i.test(cleanQuestion) && /^[a-z_$][a-z0-9_$]*$/i.test(correctAnswer)) {
            return buildGuide(`${correctAnswer} is correct because the Proxy forwards that property lookup to the wrapped target object.`, geeksForGeeksSourcePages.jsProxy);
        }
        if (/\.___\(/.test(cleanQuestion) || /\.___/.test(cleanQuestion)) {
            if (storedGuide) {
                return storedGuide;
            }
            return buildGuide(`${correctAnswer} is correct because it completes the JavaScript expression as ${fillQuestionBlank(rawQuestion, correctAnswer)}.`, likelySource);
        }
        if (storedGuide) {
            return storedGuide;
        }
        return buildGuide(`${correctAnswer} is correct because it completes the JavaScript code as ${fillQuestionBlank(rawQuestion, correctAnswer)}.`, likelySource);
    }

    if (selectedLang === "java") {
        if (/new int\[_{3,4}\]/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because that number sets the array length, so the array can store ${correctAnswer} elements.`, w3SchoolsSourcePages.javaDataTypes);
        }
        if (/for\(int i=0;\s*i<10;\s*i_{3,4}\)/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because the loop needs to increment i after each iteration.`, w3SchoolsSourcePages.javaOperators);
        }
        if (/System\.out\.___\(/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because println() prints the text and then starts a new line.`, w3SchoolsSourcePages.javaSyntax);
        }
        if (/str\.___\(/i.test(rawQuestion) && normalizedAnswer === "equals") {
            return buildGuide(`${correctAnswer} is correct because equals() compares the contents of strings, not just their references.`, w3SchoolsSourcePages.javaStrings);
        }
        if (/try\s*\{\s*\}\s*___\s*\(exception e\)/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because catch handles an exception thrown inside the try block.`, w3SchoolsSourcePages.javaSyntax);
        }
        if (/ArrayList_{3,4}\(\)|HashMap_{3,4}\(\)/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because the diamond operator lets Java infer the generic type arguments.`, w3SchoolsSourcePages.javaSyntax);
        }
        if (/switch\(x\)\s*\{\s*___\s*1:/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because case starts the branch label for that switch value.`, w3SchoolsSourcePages.javaSyntax);
        }
        if (/class A ___ B/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because extends is the Java keyword for class inheritance.`, w3SchoolsSourcePages.javaInheritance);
        }
        if (/int x = ___\(5\.9\)/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because that cast converts the decimal value to int by truncating the fractional part.`, w3SchoolsSourcePages.javaDataTypes);
        }
        if (/___\(x > 0\);/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because assert checks that the condition is true during debugging or testing.`, geeksForGeeksSourcePages.javaKeywords);
        }
        if (/Optional\.___\(/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because Optional.of(...) wraps the provided non-null value in an Optional.`, geeksForGeeksSourcePages.javaOptionalOf);
        }
        if (/IntStream\.range\(1,10\)\.___\(\)/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because sum() adds all values produced by the IntStream.`, geeksForGeeksSourcePages.javaIntStreamSum);
        }
        if (/new Thread\(___\)/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because Thread expects a Runnable when you pass work for the thread to execute.`, geeksForGeeksSourcePages.javaLambda);
        }
        if (/Paths\.___\(/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because Paths.get(...) creates a Path object from the given text path.`, w3SchoolsSourcePages.javaReference);
        }
        if (/List\.___Of\(/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because List.of(...) creates a list from the provided values.`, geeksForGeeksSourcePages.javaOptionalOf);
        }
        if (/record Point\(int x, int y\) ___;/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because the declaration ends there, so the record statement must be terminated with a semicolon.`, w3SchoolsSourcePages.javaSyntax);
        }
        if (/sealed class A ___ permits/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because permits introduces the list of subclasses allowed by a sealed class.`, geeksForGeeksSourcePages.javaSealedClasses);
        }
        if (/CompletableFuture\.runAsync\(___\)/i.test(rawQuestion)) {
            return buildGuide(`${correctAnswer} is correct because runAsync expects a Runnable task, and a lambda expression provides that task inline.`, geeksForGeeksSourcePages.javaCompletableFuture);
        }
        if (/enum Day \{ MON, TUE, ___ \}/i.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because it is the next enum constant in the declaration list.`, geeksForGeeksSourcePages.javaKeywords);
        }
        if (storedGuide) {
            return storedGuide;
        }
        if (/___/.test(cleanQuestion)) {
            return buildGuide(`${correctAnswer} is correct because it completes the Java code as ${fillQuestionBlank(rawQuestion, correctAnswer)}.`, likelySource);
        }
    }

    return null;
}

function getLanguageSpecificGuide(questionData, likelySource) {
    const correctAnswer = questionData.options[questionData.answer];
    const normalizedAnswer = normalizeDefinitionKey(correctAnswer);
    const cleanQuestion = stripQuestionMarkup(questionData.question);
    const storedText = getStoredExplanationText(normalizedAnswer);
    const storedGuide = storedText
        ? buildGuide(formatStoredExplanation(correctAnswer, storedText), likelySource)
        : null;

    const codeGuide = getCodeQuestionGuide(questionData);
    if (codeGuide) {
        return codeGuide;
    }

    if (selectedLang === "java") {
        if (/correct declaration of the main method/i.test(cleanQuestion)) {
            return buildGuide("public static void main(String[] args) is the Java entry point. public lets the JVM access it, static lets it run without an object, and void means it returns no value.", w3SchoolsSourcePages.javaSyntax);
        }
        if (/whole numbers/i.test(cleanQuestion)) {
            return buildGuide("int stores whole-number values without decimals.", w3SchoolsSourcePages.javaDataTypes);
        }
        if (/symbol is used for comments/i.test(cleanQuestion)) {
            return buildGuide("// starts a single-line comment, so the compiler ignores the rest of that line.", w3SchoolsSourcePages.javaComments);
        }
        if (/print to the console/i.test(cleanQuestion)) {
            return buildGuide("System is the class used in System.out.println(), which gives access to standard output.", w3SchoolsSourcePages.javaSyntax);
        }
        if (/scope of a variable declared inside a method/i.test(cleanQuestion)) {
            return buildGuide("A variable declared inside a method has local scope, so it exists only inside that method or block.", w3SchoolsSourcePages.javaSyntax);
        }
        if (/most restrictive/i.test(cleanQuestion)) {
            return buildGuide("private is the most restrictive access level because it limits access to the same class only.", w3SchoolsSourcePages.javaModifiers);
        }
        if (/hiding implementation details/i.test(cleanQuestion)) {
            return buildGuide("Encapsulation hides internal details and exposes controlled access through methods or modifiers.", w3SchoolsSourcePages.javaEncapsulation);
        }
        if (/default access modifier of class members/i.test(cleanQuestion)) {
            return buildGuide("package-private is correct because Java uses package access when no modifier is written.", w3SchoolsSourcePages.javaModifiers);
        }
        if (/collection allows duplicates/i.test(cleanQuestion)) {
            return buildGuide("ArrayList allows duplicate elements while preserving insertion order.", w3SchoolsSourcePages.javaArrayList);
        }
        if (/size of char/i.test(cleanQuestion)) {
            return buildGuide("Java char uses 2 bytes because it stores a Unicode character.", w3SchoolsSourcePages.javaDataTypes);
        }
        if (/guaranteed to run at least once/i.test(cleanQuestion)) {
            return buildGuide("A do-while loop executes its body before checking the condition, so it always runs at least once.", w3SchoolsSourcePages.javaBreak);
        }
        if (/interface is used for sorting/i.test(cleanQuestion)) {
            return buildGuide("Comparable is used for natural ordering because it defines compareTo().", w3SchoolsSourcePages.javaInterface);
        }
        if (/size of an int array/i.test(cleanQuestion)) {
            return buildGuide("int[5] creates an array with five slots, indexed from 0 through 4.", w3SchoolsSourcePages.javaDataTypes);
        }
        if (/array index out of bounds/i.test(cleanQuestion)) {
            return buildGuide("ArrayIndexOutOfBoundsException is thrown when code tries to access an invalid array index.", w3SchoolsSourcePages.javaReference);
        }
        if (/design pattern is used by the string class/i.test(cleanQuestion)) {
            return buildGuide("Immutable is correct because Java String objects cannot be changed after they are created.", w3SchoolsSourcePages.javaStrings);
        }
        if (/maximum value of byte/i.test(cleanQuestion)) {
            return buildGuide("127 is the highest signed value that fits in a Java byte.", w3SchoolsSourcePages.javaDataTypes);
        }
        if (/thread-safe by default/i.test(cleanQuestion)) {
            return buildGuide("Vector is synchronized, so its operations are thread-safe by default.", geeksForGeeksSourcePages.javaKeywords);
        }
        if (/interface is for lambda expressions/i.test(cleanQuestion)) {
            return buildGuide("A functional interface has one abstract method, which is why a lambda can implement it.", geeksForGeeksSourcePages.javaLambda);
        }
        if (/used for lifo/i.test(cleanQuestion)) {
            return buildGuide("Stack is a LIFO structure, so the last item pushed is the first one popped.", w3SchoolsSourcePages.javaReference);
        }
        if (/deprecated methods/i.test(cleanQuestion)) {
            return buildGuide("@Deprecated marks an API as outdated so tools and developers can move to a replacement.", geeksForGeeksSourcePages.javaAnnotations);
        }
        if (/reflection api/i.test(cleanQuestion)) {
            return buildGuide("The Reflection API is used for runtime inspection of classes, methods, fields, and annotations.", geeksForGeeksSourcePages.javaReflection);
        }
        if (/stream operations/i.test(cleanQuestion)) {
            return buildGuide("stream() starts a stream pipeline so collection data can be processed with operations like map, filter, and reduce.", geeksForGeeksSourcePages.javaIntStreamSum);
        }
    }

    if (selectedLang === "html") {
        if (/correct doctype for html5/i.test(cleanQuestion)) {
            return buildGuide("<!DOCTYPE html> is the HTML5 doctype declaration, and it triggers standards mode in the browser.", w3SchoolsSourcePages.htmlReference);
        }
        if (/self-closing tag/i.test(cleanQuestion)) {
            return buildGuide("<img> is a void element, so it does not need a closing tag.", w3SchoolsSourcePages.htmlImages);
        }
        if (/not a valid html5 element/i.test(cleanQuestion)) {
            return buildGuide("<container> is not a standard HTML element, unlike tags such as <div>, <section>, or <article>.", w3SchoolsSourcePages.htmlReference);
        }
        if (/input type is used for email/i.test(cleanQuestion)) {
            return buildGuide("email is the input type used when the field should accept an email address.", w3SchoolsSourcePages.htmlInputTypes);
        }
        if (/purpose of data-\*/i.test(cleanQuestion)) {
            return buildGuide("data-* attributes store custom data on an element without inventing non-standard attributes.", w3SchoolsSourcePages.htmlSemantic);
        }
        if (/semantic html/i.test(cleanQuestion)) {
            return buildGuide("Semantic HTML gives content meaning and structure, which improves accessibility and search understanding.", w3SchoolsSourcePages.htmlSemantic);
        }
        if (/difference between <article> and <section>/i.test(cleanQuestion)) {
            return buildGuide("An article is standalone content that could make sense by itself, while a section groups related content inside a page.", w3SchoolsSourcePages.htmlSemantic);
        }
        if (/responsive images/i.test(cleanQuestion)) {
            return buildGuide("srcset and sizes work together so the browser can choose the most suitable image resource for the current layout.", w3SchoolsSourcePages.htmlImages);
        }
        let match = cleanQuestion.match(/^Which tag is used(?: for| to)? (.+?)\??$/i);
        if (match) {
            if (/^both /i.test(correctAnswer)) {
                return buildGuide(`${correctAnswer} is correct because W3Schools shows that both tags can create that text effect, even though they can differ in semantic meaning.`, likelySource);
            }
            return buildGuide(`${correctAnswer} is correct because W3Schools uses the ${correctAnswer} tag for ${trimSentence(match[1])}.`, likelySource);
        }

        match = cleanQuestion.match(/^Which attribute is used(?: for| to)? (.+?)\??$/i);
        if (match) {
            return buildGuide(`${correctAnswer} is correct because W3Schools uses the ${correctAnswer} attribute for ${trimSentence(match[1])}.`, likelySource);
        }
    }

    if (selectedLang === "css") {
        if (/relative to the root font size/i.test(cleanQuestion)) {
            return buildGuide("rem is measured from the root element's font size, not the current element's font size.", w3SchoolsSourcePages.cssUnits);
        }
        if (/retrieves a custom property/i.test(cleanQuestion)) {
            return buildGuide("var() reads the value of a CSS custom property such as --brand-color.", w3SchoolsSourcePages.cssReference);
        }
        if (/makes grayscale/i.test(cleanQuestion)) {
            return buildGuide("grayscale() is the CSS filter function that removes color information from the element.", w3SchoolsSourcePages.cssReference);
        }
        if (/makes blur/i.test(cleanQuestion)) {
            return buildGuide("blur() is the CSS filter function that softens the element by blurring its pixels.", w3SchoolsSourcePages.cssReference);
        }
        const propertyUseMatch = cleanQuestion.match(/^Which property (?:is used|controls|sets|makes|changes|defines|applies|repeats|removes) (.+?)\??$/i);
        if (propertyUseMatch) {
            return buildGuide(`${correctAnswer} is correct because W3Schools lists ${correctAnswer} as the CSS property used to ${trimSentence(propertyUseMatch[1])}.`, getCssSourceForProperty(correctAnswer));
        }

        const functionMatch = cleanQuestion.match(/^Which function (?:retrieves|makes) (.+?)\??$/i);
        if (functionMatch) {
            return buildGuide(`${correctAnswer} is correct because W3Schools uses ${correctAnswer} for ${trimSentence(functionMatch[1])}.`, w3SchoolsSourcePages.cssReference);
        }
    }

    if (selectedLang === "python") {
        if (/^What is the data type of:? \{1,2,3\}\??$/i.test(cleanQuestion)) {
            return buildGuide("set is correct because Python uses curly braces with comma-separated unique values to create a set.", w3SchoolsSourcePages.pythonDataTypes);
        }
        if (/symbol for a comment/i.test(cleanQuestion)) {
            return buildGuide("# starts a single-line comment in Python.", w3SchoolsSourcePages.pythonReference);
        }
        if (/function is used for user input/i.test(cleanQuestion)) {
            return buildGuide("input() reads text entered by the user and returns it as a string.", w3SchoolsSourcePages.pythonFunctions);
        }
        if (/symbol is used for string concatenation/i.test(cleanQuestion)) {
            return buildGuide("+ joins strings together in Python.", w3SchoolsSourcePages.pythonReference);
        }
        if (/standard indentation/i.test(cleanQuestion)) {
            return buildGuide("4 spaces is the standard indentation style recommended for Python code.", w3SchoolsSourcePages.pythonReference);
        }
        if (/absolute value/i.test(cleanQuestion)) {
            return buildGuide("abs() returns the absolute value of a number.", w3SchoolsSourcePages.pythonReference);
        }
        if (/string to integer/i.test(cleanQuestion)) {
            return buildGuide("int() converts compatible text or numbers into an integer value.", w3SchoolsSourcePages.pythonDataTypes);
        }
        if (/zip operation/i.test(cleanQuestion)) {
            return buildGuide("zip() pairs items from multiple iterables based on their positions.", w3SchoolsSourcePages.pythonReference);
        }
        if (/filter operation/i.test(cleanQuestion)) {
            return buildGuide("filter() keeps the items for which the filtering function returns true.", w3SchoolsSourcePages.pythonReference);
        }
        if (/static methods/i.test(cleanQuestion)) {
            return buildGuide("@staticmethod marks a method that does not automatically receive self or cls.", geeksForGeeksSourcePages.pythonStaticMethod);
        }
        if (/object id|memory address/i.test(cleanQuestion)) {
            return buildGuide("id() returns an identity value for the object during the current program run.", w3SchoolsSourcePages.pythonReference);
        }
        if (/code evaluation/i.test(cleanQuestion)) {
            return buildGuide("eval() evaluates a Python expression stored as a string.", w3SchoolsSourcePages.pythonReference);
        }
        if (/dynamic import/i.test(cleanQuestion)) {
            return buildGuide("__import__() imports a module dynamically using its name.", geeksForGeeksSourcePages.pythonImport);
        }
        if (/task creation/i.test(cleanQuestion)) {
            return buildGuide("asyncio.create_task() schedules a coroutine to run concurrently as an asyncio Task.", geeksForGeeksSourcePages.pythonAsyncio);
        }
        if (/process creation/i.test(cleanQuestion)) {
            return buildGuide("Process starts a separate process through Python's multiprocessing module.", geeksForGeeksSourcePages.pythonMultiprocessing);
        }
        if (/memory profiling/i.test(cleanQuestion)) {
            return buildGuide("tracemalloc tracks Python memory allocations so memory usage can be analyzed.", geeksForGeeksSourcePages.pythonMemory);
        }
    }

    if (selectedLang === "javascript") {
        if (/optional chaining/.test(cleanQuestion)) {
            return buildGuide("Checks null/undefined is correct because optional chaining stops the access chain when the value is null or undefined instead of throwing an error.", w3SchoolsSourcePages.jsReference);
        }
        if (/destructuring assignment work with arrays/i.test(cleanQuestion)) {
            return buildGuide("Extracts values is correct because array destructuring pulls values out of array positions into separate variables.", w3SchoolsSourcePages.jsReference);
        }
        if (/dynamic import/.test(cleanQuestion)) {
            return buildGuide("Loads modules at runtime is correct because import() returns a Promise and loads the module only when that code runs.", w3SchoolsSourcePages.jsReference);
        }
        if (/\btdz\b/i.test(cleanQuestion)) {
            return buildGuide("Cannot access before declared is correct because the Temporal Dead Zone blocks access to let and const variables until their declaration is reached.", w3SchoolsSourcePages.jsVariables);
        }
        if (/variable that can change value/i.test(cleanQuestion)) {
            return buildGuide("let declares a block-scoped variable whose value can be reassigned.", w3SchoolsSourcePages.jsVariables);
        }
        if (/single-line comment/i.test(cleanQuestion)) {
            return buildGuide("// starts a single-line comment in JavaScript.", w3SchoolsSourcePages.jsReference);
        }
        if (/strict equality comparison/i.test(cleanQuestion)) {
            return buildGuide("=== compares both value and type, so it is the strict equality operator.", w3SchoolsSourcePages.jsVariables);
        }
        if (/adds an element to the end/i.test(cleanQuestion)) {
            return buildGuide("push() adds one or more elements to the end of an array.", w3SchoolsSourcePages.jsArrayMethods);
        }
        if (/access the first element of an array/i.test(cleanQuestion)) {
            return buildGuide("arr[0] is correct because JavaScript arrays use zero-based indexing, so index 0 is the first element.", w3SchoolsSourcePages.jsArrayMethods);
        }
        if (/represents the browser window/i.test(cleanQuestion)) {
            return buildGuide("window is the global browser object for the current tab or window.", w3SchoolsSourcePages.jsReference);
        }
        if (/show a popup alert/i.test(cleanQuestion)) {
            return buildGuide("alert() opens a simple browser alert dialog.", w3SchoolsSourcePages.jsReference);
        }
        if (/declare a constant/i.test(cleanQuestion)) {
            return buildGuide("const declares a block-scoped binding that cannot be reassigned.", w3SchoolsSourcePages.jsVariables);
        }
        if (/stops a loop immediately/i.test(cleanQuestion)) {
            return buildGuide("break exits the nearest loop or switch immediately.", w3SchoolsSourcePages.jsReference);
        }
        if (/removes the first element/i.test(cleanQuestion)) {
            return buildGuide("shift() removes and returns the first element of an array.", w3SchoolsSourcePages.jsArrayMethods);
        }
        if (/used inside a class to call its parent/i.test(cleanQuestion)) {
            return buildGuide("super is used in a subclass to call the parent constructor or parent methods.", w3SchoolsSourcePages.jsClasses);
        }
        if (/default parameter/i.test(cleanQuestion)) {
            return buildGuide("param=default assigns a fallback value that is used when the argument is omitted.", w3SchoolsSourcePages.jsFunctions);
        }
        if (/iterating over object properties/i.test(cleanQuestion)) {
            return buildGuide("for...in iterates over an object's enumerable property names.", w3SchoolsSourcePages.jsReference);
        }
        if (/resolves immediately/i.test(cleanQuestion)) {
            return buildGuide("Promise.resolve() creates a Promise that is already resolved.", w3SchoolsSourcePages.jsAsync);
        }
        if (/declare an arrow function/i.test(cleanQuestion)) {
            return buildGuide("() => {} is arrow function syntax.", w3SchoolsSourcePages.jsFunctions);
        }
        if (/length of a string/i.test(cleanQuestion)) {
            return buildGuide("str.length returns the number of characters in the string.", w3SchoolsSourcePages.jsReference);
        }
        if (/stop event bubbling/i.test(cleanQuestion)) {
            return buildGuide("stopPropagation() prevents the event from bubbling to ancestor elements.", geeksForGeeksSourcePages.jsEventDelegation);
        }
        if (/convert a string to an integer/i.test(cleanQuestion)) {
            return buildGuide("parseInt() reads the string and converts its numeric part into an integer.", w3SchoolsSourcePages.jsReference);
        }
    }

    if (storedGuide) {
        return storedGuide;
    }

    return null;
}

function getConceptLabel(questionText) {
    const concepts = [
        { regex: /which array method/i, label: "array method" },
        { regex: /which built-in object/i, label: "built-in object" },
        { regex: /which access modifier/i, label: "access modifier" },
        { regex: /which data type/i, label: "data type" },
        { regex: /which keyword/i, label: "keyword" },
        { regex: /which method/i, label: "method" },
        { regex: /which operator/i, label: "operator" },
        { regex: /which class/i, label: "class" },
        { regex: /which attribute/i, label: "attribute" },
        { regex: /which interface/i, label: "interface" },
        { regex: /which collection/i, label: "collection" },
        { regex: /which exception/i, label: "exception" },
        { regex: /which annotation/i, label: "annotation" },
        { regex: /which loop/i, label: "loop" },
        { regex: /which function/i, label: "function" },
        { regex: /which symbol/i, label: "symbol" },
        { regex: /what is the data type/i, label: "data type" },
        { regex: /what is the default value/i, label: "default value" },
        { regex: /what is the scope/i, label: "scope" }
    ];

    const match = concepts.find((entry) => entry.regex.test(questionText));
    return match ? match.label : "";
}

function formatStoredExplanation(correctAnswer, storedText) {
    const explanation = String(storedText).trim().replace(/[.]+$/, "");
    const lowerExplanation = explanation.charAt(0).toLowerCase() + explanation.slice(1);

    if (/^(creates|represents|starts|provides|marks|checks|lets|refers|allows|returns|runs|stores|gives|turns|controls|defines|prevents|pauses|combines|converts|declares|describes|shows|points|compares|means|reads|pairs|tracks|opens|exits|groups|connects|terminates|sorts|adds|removes|iterates|assigns|wraps|draws|keeps|forces|tells|identifies|declares|embeds|applies|computes)\b/i.test(explanation)) {
        return `${correctAnswer} is correct because it ${lowerExplanation}.`;
    }

    if (/^(is|can|has|uses|works|acts|serves)\b/i.test(explanation)) {
        return `${correctAnswer} is correct because it ${lowerExplanation}.`;
    }

    if (/^(a|an)\b/i.test(explanation)) {
        return `${correctAnswer} is correct because it is ${lowerExplanation}.`;
    }

    return `${correctAnswer} is correct because ${lowerExplanation}.`;
}

function getExpressionExplanation(questionText, correctAnswer, languageLabel) {
    const cleanQuestion = stripQuestionMarkup(questionText);
    const returnMatch = cleanQuestion.match(/^What does (.+?) return\??$/i);
    const expression = returnMatch
        ? returnMatch[1].trim()
        : cleanQuestion
            .replace(/^What is the output of:\s*/i, "")
            .replace(/^What is the result of\s*/i, "")
            .replace(/^What is returned by\s*/i, "")
            .replace(/\?$/, "")
            .trim();

    if (/5\s*\/\s*2/.test(expression) && languageLabel === "Java") {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that Java uses integer division when both numbers are integers. That means 5 / 2 becomes 2, not 2.5.`, w3SchoolsSourcePages.javaOperators);
    }

    if (/10\s*%\s*3/.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that the % operator returns the remainder after division. 10 divided by 3 leaves a remainder of 1.`, w3SchoolsSourcePages.javaOperators);
    }

    if (/charAt\(1\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that charAt() uses zero-based indexing. Index 1 is the second character, so "abc".charAt(1) returns "b".`, w3SchoolsSourcePages.javaStrings);
    }

    if (/Math\.ceil\(4\.3\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that Math.ceil() rounds a value upward to the next whole number, so 4.3 becomes 5.0.`, w3SchoolsSourcePages.javaOperators);
    }

    if (/substring\(1,\s*3\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that substring(begin, end) starts at the first index and stops before the second one. That is why "Hello".substring(1, 3) returns "el".`, w3SchoolsSourcePages.javaStrings);
    }

    if (/Boolean\.parseBoolean\(['"]TRUE['"]\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that Boolean.parseBoolean() reads the text "true" without caring about letter case, so "TRUE" becomes true.`, w3SchoolsSourcePages.javaBooleans);
    }

    if (/Integer\.parseInt\(['"]010['"]\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that Integer.parseInt() converts a string to an integer in base 10 unless another base is provided, so "010" becomes 10.`, w3SchoolsSourcePages.javaOperators);
    }

    if (/'5'\s*\+\s*2/.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that when a string is combined with another value using +, Java joins them as text, so '5' + 2 becomes "52".`, w3SchoolsSourcePages.javaStrings);
    }

    if (/1\.0\s*\/\s*0\.0/.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that floating-point math in Java can produce Infinity for division by zero instead of throwing the same kind of error you would get with integer division.`, w3SchoolsSourcePages.javaOperators);
    }

    if (/Character\.isDigit\(['"]5['"]\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because Character.isDigit() checks whether a character is a numeric digit, and W3Schools examples use it for that exact kind of test.`, w3SchoolsSourcePages.javaStrings);
    }

    if (/Math\.round\(4\.6\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that Math.round() returns the nearest whole number, and 4.6 rounds up to 5.`, w3SchoolsSourcePages.javaOperators);
    }

    if (/Integer\.MAX_VALUE\s*\+\s*1/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains the fixed size of Java int values. When you go past the maximum int, the value overflows and wraps around.`, w3SchoolsSourcePages.javaDataTypes);
    }

    if (/typeof\s*\[\]/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that arrays are a special type of object in JavaScript, so typeof [] returns "object".`, w3SchoolsSourcePages.jsVariables);
    }

    if (/Array\.isArray\(\{\}\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that Array.isArray() only returns true for actual arrays. {} is a plain object, so the result is false.`, w3SchoolsSourcePages.jsArraySearch);
    }

    if (/JSON\.parse\(["']10["']\)/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that JSON.parse() converts JSON text into a JavaScript value. The JSON text "10" becomes the number 10.`, w3SchoolsSourcePages.jsJsonParse);
    }

    if (/typeof\s+NaN/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that NaN still belongs to JavaScript's number type, so typeof NaN is "number".`, w3SchoolsSourcePages.jsVariables);
    }

    if (/null\s*==\s*undefined/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that with loose equality, null and undefined are equal to each other.`, w3SchoolsSourcePages.jsVariables);
    }

    if (/Object\.keys\(/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that Object.keys() returns an array of an object's own property names.`, w3SchoolsSourcePages.jsVariables);
    }

    if (/arr\.includes\(/i.test(expression)) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that includes() checks whether the array contains a value and returns true or false.`, w3SchoolsSourcePages.jsArraySearch);
    }

    if (expression) {
        return buildGuide(`${correctAnswer} is correct because ${expression} evaluates to ${correctAnswer}.`, getLikelyW3SchoolsSource(cleanQuestion, normalizeDefinitionKey(correctAnswer)));
    }

    return buildGuide(`${correctAnswer} is correct because the code in the question evaluates to ${correctAnswer}.`, getLikelyW3SchoolsSource(cleanQuestion, normalizeDefinitionKey(correctAnswer)));
}

function getCorrectAnswerExplanation(questionData) {
    const correctAnswer = questionData.options[questionData.answer];
    const cleanQuestion = stripQuestionMarkup(questionData.question);
    const languageLabel = languageLabels[selectedLang] || "coding";
    const normalizedAnswer = normalizeDefinitionKey(correctAnswer);
    const likelySource = getLikelyW3SchoolsSource(cleanQuestion, normalizedAnswer);
    const languageSpecificGuide = getLanguageSpecificGuide(questionData, likelySource);
    const directGuide = getStoredW3SchoolsGuide(normalizedAnswer);
    const directExplanation = getStoredExplanationText(normalizedAnswer);

    if (languageSpecificGuide) {
        return languageSpecificGuide;
    }

    if (directGuide) {
        return directGuide;
    }

    if (directExplanation) {
        return buildGuide(formatStoredExplanation(correctAnswer, directExplanation), likelySource);
    }

    if (cleanQuestion.includes("___")) {
        return buildGuide(`${correctAnswer} is correct because it is the option that completes the code with valid ${languageLabel} syntax, which matches how W3Schools presents this syntax pattern.`, likelySource);
    }

    let match = cleanQuestion.match(/^What does (.+?) stand for\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because ${trimSentence(match[1])} expands to ${correctAnswer}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which keyword is used to (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that ${languageLabel} uses this keyword to ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which keyword is used for (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that ${languageLabel} uses this keyword for ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which method is used to (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools uses that method for ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which method should be overridden for (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools identifies it as the method commonly overridden for ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which operator is used for (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools uses that operator for ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which attribute is used(?: for)? (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that it is the HTML attribute used for ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^Which class is used to (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools uses that class to ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^What is the purpose of (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that ${trimSentence(match[1])} is used for ${correctAnswer}.`, likelySource);
    }

    match = cleanQuestion.match(/^What is the role of (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools explains that ${trimSentence(match[1])} is used for ${correctAnswer}.`, likelySource);
    }

    match = cleanQuestion.match(/^What is the default value of (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that ${trimSentence(match[1])} starts with that default value in this context.`, likelySource);
    }

    match = cleanQuestion.match(/^What is the data type of (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because W3Schools shows that ${trimSentence(match[1])} belongs to the ${correctAnswer} data type.`, likelySource);
    }

    if (/^What is the result of:? /i.test(cleanQuestion) || /^What is the output of:? /i.test(cleanQuestion)) {
        return getExpressionExplanation(cleanQuestion, correctAnswer, languageLabel);
    }

    if (/^What does .+ return\??$/i.test(cleanQuestion) || /^What is returned by /i.test(cleanQuestion)) {
        return getExpressionExplanation(cleanQuestion, correctAnswer, languageLabel);
    }

    if (/^What is the difference between /i.test(cleanQuestion)) {
        return buildGuide(`${correctAnswer} is correct because that is the correct difference between the two concepts in the question.`, likelySource);
    }

    match = cleanQuestion.match(/^Which ([a-z ]+?) (.+?)\??$/i);
    if (match) {
        const kind = trimSentence(match[1]);
        const clause = lowercaseFirst(trimSentence(match[2]));
        const beVerb = chooseBeVerb(correctAnswer);
        const pronoun = beVerb === "are" ? "they" : "it";
        return buildGuide(`${correctAnswer} is correct because ${pronoun} ${beVerb} the ${kind} that ${clause}.`, likelySource);
    }

    match = cleanQuestion.match(/^How do you (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because it is the syntax used to ${trimSentence(match[1])}.`, likelySource);
    }

    match = cleanQuestion.match(/^How does (.+?) work\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because ${trimSentence(match[1])} works like this: ${correctAnswer}.`, likelySource);
    }

    match = cleanQuestion.match(/^What is (?:an|a) (.+?)\??$/i);
    if (match) {
        return buildGuide(`${correctAnswer} is correct because ${trimSentence(match[1])} means ${correctAnswer}.`, likelySource);
    }

    const conceptLabel = getConceptLabel(cleanQuestion);
    if (conceptLabel) {
        const beVerb = chooseBeVerb(correctAnswer);
        const pronoun = beVerb === "are" ? "they" : "it";
        return buildGuide(`${correctAnswer} is correct because ${pronoun} ${beVerb} the ${conceptLabel} asked for in the question.`, likelySource);
    }

    if (/^-?\d+(\.\d+)?$/.test(correctAnswer)) {
        return buildGuide(`${correctAnswer} is correct because the question leads to the numeric result ${correctAnswer}.`, likelySource);
    }

    if (/^(true|false)$/i.test(correctAnswer)) {
        return buildGuide(`${correctAnswer} is correct because the statement in the question evaluates to ${correctAnswer}.`, likelySource);
    }

    if (/[<>{}()[\];:=/%+*.-]/.test(correctAnswer)) {
        return buildGuide(`${correctAnswer} is correct because it is the syntax or code element that makes the statement valid.`, likelySource);
    }

    if (correctAnswer.includes(" ")) {
        return buildGuide(`${correctAnswer} is correct because it directly answers what the question is asking.`, likelySource);
    }

    return buildGuide(`${correctAnswer} is correct because it best fits the rule or concept being tested in the question.`, likelySource);
}

function revealCorrectAnswerExplanation(questionData, isCorrect) {
    const panel = document.getElementById("definition-panel");
    const status = document.getElementById("definition-status");
    const answer = document.getElementById("definition-answer");
    const text = document.getElementById("definition-text");
    const source = document.getElementById("definition-source");
    const sourceLink = document.getElementById("definition-source-link");
    const nextButton = document.getElementById("next-question-button");
    const guide = getCorrectAnswerExplanation(questionData);

    if (panel) panel.classList.add("revealed");
    if (status) {
        status.textContent = isCorrect
            ? "You picked the correct answer. Here is why it is correct."
            : "Here is the correct answer and why it is correct.";
    }
    if (answer) answer.textContent = questionData.options[questionData.answer];
    if (text) text.textContent = makeExplanationDirect(guide.explanation, questionData.options[questionData.answer]);
    if (source && sourceLink && guide.sourceUrl) {
        source.hidden = false;
        sourceLink.href = guide.sourceUrl;
        sourceLink.textContent = guide.sourceLabel;
    } else if (source) {
        source.hidden = true;
    }

    if (nextButton) {
        nextButton.hidden = false;
        nextButton.textContent = currentIndex === currentQuiz.length - 1 ? "See Result" : "Next Question";
    }
}

// Update subtitle text
function updateSubtitle(text) {
    const subtitle = document.querySelector(".quiz-subtitle");
    if (subtitle) subtitle.textContent = text;
}

// Name Validation
async function isNameTaken(name) {
    const q = query(collection(db, "users"), where("name", "==", name));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}

// Start Game
window.startGame = async function () {
    const input = document.getElementById("playerName").value.trim();
    if (!input) {
        alert("Please enter your name!");
        return;
    }

    if (await isNameTaken(input)) {
        const proceed = confirm("This name already exists. Do you want to continue as this user?");
        if (!proceed) return; // user cancels → stop
        playerName = input;   // user agrees → log in
    } else {
        playerName = input;   // new user
    }

    localStorage.setItem(playerNameStorageKey, playerName);

    document.getElementById("name-section").style.display = "none";
    document.getElementById("tabs").style.display = "block";
    updateSubtitle("Choose a language to take the quiz"); // ✅ Added line

    await loadOverallLeaderboard();
};

// Choose Language
window.chooseDifficulty = function (lang) {
    selectedLang = lang;
    document.getElementById("tabs").style.display = "none";
    document.getElementById("difficulty-section").style.display = "block";
    updateSubtitle("Choose a difficulty level"); // ✅ Added line
};

// Load Quiz
window.loadQuiz = function (difficulty) {
    if (!selectedLang) {
        alert("Please select a language first!");
        return;
    }

    let pool = [...(quizzes[selectedLang][difficulty] || [])];
    shuffleArray(pool);

    const limit = Math.min(questionLimits[difficulty], pool.length);
    currentQuiz = pool.slice(0, limit).map(q => ({ ...q, difficulty }));

    currentIndex = 0;
    score = 0;
    document.getElementById("difficulty-section").style.display = "none";
    updateSubtitle("Good luck on your quiz!"); 

    loadLeaderboard(selectedLang, difficulty);
    showQuestion();
};

// Show Question
function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function showQuestion() {
    if (currentIndex < currentQuiz.length) {
        const q = currentQuiz[currentIndex];
        timeLeft = 20;

        shuffledOptions = q.options.map((opt, i) => ({ text: opt, index: i }));
        shuffleArray(shuffledOptions);

        document.getElementById("quiz-box").innerHTML = `
            <div class="question">${escapeHTML(q.question)}</div>
            <div class="timer">⏳ Time left: <span id="time">${timeLeft}</span>s</div>
            <div class="options">
                ${shuffledOptions.map((opt, i) =>
            `<button id="opt-${i}" class="option-btn" onclick="checkAnswer(${opt.index}, ${i})">${escapeHTML(opt.text)}</button>`
        ).join("")}
            </div>
            <div class="quiz-controls">
                <button class="play-again-button" onclick="selectNewLanguage()" style="margin-top:30px">🌐 Select New Language</button>
            </div>
        `;
        startTimer();
    } else {
        endGame();
    }
}

// Timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentIndex++;
            showQuestion();
        }
    }, 1000);
}

// Check Answer 
window.checkAnswer = function (originalIndex, btnIndex) {
    clearInterval(timer);
    const q = currentQuiz[currentIndex];

    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (shuffledOptions[i].index === q.answer) btn.classList.add("correct");
    });

    if (originalIndex !== q.answer) {
        document.getElementById(`opt-${btnIndex}`).classList.add("wrong");
    } else {
        score += 20 + timeLeft;
    }

    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 1500);
};

//  End Game
async function endGame() {
    document.getElementById("quiz-box").innerHTML = `
        <div class="result">🎉 Tapos na! ${playerName}, score mo: ${score}</div>
        <button class="play-again-button" onclick="restart()">Play Again</button>
        <button class="go-home-button" onclick="goHome()">Go Home</button>
    `;
    await saveResult(playerName, score);
    loadLeaderboard(selectedLang, currentQuiz[0]?.difficulty || "easy");
}

// Restart
window.restart = function () {
    document.getElementById("tabs").style.display = "block";
    document.getElementById("quiz-box").innerHTML = `<p class="initial-message">Pumili ng language.</p>`;
};

//  Go Home 
window.goHome = function () {
    document.getElementById("name-section").style.display = "block";
    document.getElementById("tabs").style.display = "none";
    document.getElementById("difficulty-section").style.display = "none";
    document.getElementById("quiz-box").innerHTML = `<p class="initial-message">Pumili muna ng language.</p>`;
    document.getElementById("playerName").value = "";
    updateSubtitle("Create your name"); 
};

// ✅ NEW FUNCTION: Select New Language
window.selectNewLanguage = function () {
    clearInterval(timer);
    document.getElementById("tabs").style.display = "block";
    document.getElementById("difficulty-section").style.display = "none";
    document.getElementById("quiz-box").innerHTML = `<p class="initial-message">Select a new language to start a new quiz.</p>`;
    updateSubtitle("Choose a new language");
};

// Updated quiz interaction with right-side definition panel
escapeHTML = function (str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
};

showQuestion = function () {
    if (currentIndex < currentQuiz.length) {
        const q = currentQuiz[currentIndex];
        timeLeft = 20;
        setQuizBoxState(true);

        shuffledOptions = q.options.map((opt, i) => ({ text: opt, index: i }));
        shuffleArray(shuffledOptions);

        document.getElementById("quiz-box").innerHTML = `
            <div class="quiz-layout">
                <div class="quiz-left">
                    <div class="question">${escapeHTML(q.question)}</div>
                    <div class="timer">Time left: <span id="time">${timeLeft}</span>s</div>
                    <div class="options">
                        ${shuffledOptions.map((opt, i) =>
            `<button id="opt-${i}" class="option-btn" onclick="checkAnswer(${opt.index}, ${i})">${escapeHTML(opt.text)}</button>`
        ).join("")}
                    </div>
                    <div class="quiz-controls">
                        <button id="next-question-button" class="next-question-button" onclick="nextQuestion()" hidden>Next Question</button>
                        <button class="play-again-button" onclick="selectNewLanguage()">Select New Language</button>
                    </div>
                </div>
                <aside id="definition-panel" class="definition-panel" aria-live="polite">
                    <p class="definition-label">Answer Explanation</p>
                    <p id="definition-status" class="definition-status">Pick any answer to reveal why the correct answer is right.</p>
                    <div id="definition-answer" class="definition-answer">Waiting for your answer</div>
                    <p id="definition-text" class="definition-text">The explanation for the correct answer will appear here after you choose an option.</p>
                    <p id="definition-source" class="definition-source" hidden>Source: <a id="definition-source-link" href="#" target="_blank" rel="noopener noreferrer">W3Schools</a></p>
                </aside>
            </div>
        `;
        startTimer();
    } else {
        endGame();
    }
};

window.checkAnswer = function (originalIndex, btnIndex) {
    clearInterval(timer);
    const q = currentQuiz[currentIndex];
    const isCorrect = originalIndex === q.answer;

    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (shuffledOptions[i].index === q.answer) btn.classList.add("correct");
    });

    if (!isCorrect) {
        document.getElementById(`opt-${btnIndex}`).classList.add("wrong");
    } else {
        score += 20 + timeLeft;
    }

    revealCorrectAnswerExplanation(q, isCorrect);
};

window.nextQuestion = function () {
    currentIndex++;
    showQuestion();
};

endGame = async function () {
    setQuizBoxState(false);
    document.getElementById("quiz-box").innerHTML = `
        <div class="result">Quiz finished! ${playerName}, score mo: ${score}</div>
        <button class="play-again-button" onclick="restart()">Play Again</button>
        <button class="go-home-button" onclick="goHome()">Go Home</button>
    `;
    await saveResult(playerName, score);
    loadLeaderboard(selectedLang, currentQuiz[0]?.difficulty || "easy");
};

window.restart = function () {
    setQuizBoxState(false);
    document.getElementById("tabs").style.display = "block";
    document.getElementById("quiz-box").innerHTML = `<p class="initial-message">Pumili ng language.</p>`;
};

window.goHome = function () {
    setQuizBoxState(false);
    document.getElementById("name-section").style.display = "block";
    document.getElementById("tabs").style.display = "none";
    document.getElementById("difficulty-section").style.display = "none";
    document.getElementById("quiz-box").innerHTML = `<p class="initial-message">Pumili muna ng language.</p>`;
    document.getElementById("playerName").value = "";
    updateSubtitle("Create your name");
};

window.selectNewLanguage = function () {
    clearInterval(timer);
    setQuizBoxState(false);
    document.getElementById("tabs").style.display = "block";
    document.getElementById("difficulty-section").style.display = "none";
    document.getElementById("quiz-box").innerHTML = `<p class="initial-message">Select a new language to start a new quiz.</p>`;
    updateSubtitle("Choose a new language");
};

//  Firebase Functions 
async function saveResult(name, points) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", name), where("lang", "==", selectedLang));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            const existingScore = snapshot.docs[0].data().score || 0;

            if (points > existingScore) {
                await updateDoc(docRef, { score: points, createdAt: new Date() });
                console.log("Updated user's high score!");
            } else {
                console.log("Score not higher than previous. Not updating.");
            }
        } else {
            await addDoc(usersRef, {
                name,
                score: points,
                lang: selectedLang,
                createdAt: new Date()
            });
            console.log("Saved new result!");
        }
    } catch (e) {
        console.error("Error saving result:", e);
    }
}

// Overall Leaderboard 
export async function loadOverallLeaderboard() {
    try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const scores = {};

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (!scores[data.name]) scores[data.name] = 0;
            scores[data.name] += data.score || 0;
        });

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 50);

        const list = document.getElementById("leaderboard-list");
        const label = document.getElementById("leaderboard-label");
        list.innerHTML = "";
        label.textContent = `🏆 Overall Top 50 Users`;

        sorted.forEach(([name, total], index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${name} - ${total}`;
            list.appendChild(li);
        });
    } catch (e) {
        console.error("Error loading overall leaderboard:", e);
    }
}

// Filtered Leaderboard
export async function loadLeaderboard(lang, difficulty) {
    try {
        const q = query(collection(db, "users"), where("lang", "==", lang));
        const querySnapshot = await getDocs(q);

        const scores = {};

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (!scores[data.name] || data.score > scores[data.name]) {
                scores[data.name] = data.score;
            }
        });

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 50);

        const list = document.getElementById("leaderboard-list");
        const label = document.getElementById("leaderboard-label");
        list.innerHTML = "";
        label.textContent = `Leaderboard: ${lang.toUpperCase()}`;

        sorted.forEach(([name, total], index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${name} - ${total}`;
            list.appendChild(li);
        });
    } catch (e) {
        console.error("Error loading filtered leaderboard:", e);
    }
}

//  Utility 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Auto-load overall leaderboard on page load
window.addEventListener('DOMContentLoaded', () => {
    loadOverallLeaderboard();
    updateSubtitle("Create your name");
});
