/* Données de révision PR70 – TP Java.
   Format des exercices :
   - type "trous"  : code avec des trous «réponse¦variante»
   - type "sortie" : écrire exactement ce que le programme affiche (champ reponse)
   - type "qcm"    : une seule bonne réponse (bonne = index)
   - type "multi"  : plusieurs bonnes réponses (bonnes = [index...])
   wrap : "main" = extrait à placer dans un main ; "file" = fichier complet ; absent = pas vérifié par compilation
*/
const R = String.raw;

window.CHAPITRES = [
  {
    id: "ch1", num: 1, tp: "TP1", titre: "Bases Java, String, tableaux, première classe",
    sources: "TP1 (Scanner, thermomètre, chaînes, audit Groupe, matrices) · Cours 1 et 2",
    fiche: [
      { h: "Squelette d'un programme", p: "Tout programme démarre dans ‹public static void main(String[] args)›. Une classe = un fichier du même nom (si elle est ‹public›).",
        code: R`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Votre age : ");
        int age = sc.nextInt();
        sc.nextLine();              // vide le retour à la ligne resté dans le buffer
        System.out.println("Votre nom : ");
        String nom = sc.nextLine();
        System.out.println("Vous vous appelez " + nom + " et vous avez " + age + " ans.");
    }
}` },
      { h: "Le piège du Scanner (question de TP1)", p: "‹nextInt()› lit le nombre mais laisse le caractère « Entrée » (\\n) dans le buffer. Le ‹nextLine()› suivant lit ce \\n tout de suite et renvoie une chaîne vide. Solution : appeler un ‹nextLine()› « à vide » juste après ‹nextInt()› (ou tout lire avec ‹nextLine()› puis ‹Integer.parseInt(...)›)." },
      { h: "Types et calculs", p: "‹int› / ‹int› = division entière (7/2 vaut 3). ‹%› = reste (7%2 vaut 1). Pour un résultat réel : caster, ‹(double) a / b›. ‹Math.random()› renvoie un double dans [0 ; 1[, donc ‹Math.random() - 0.5› est dans [-0.5 ; 0.5[." },
      { h: "String : méthodes à connaître", p: "‹length()› · ‹charAt(i)› · ‹indexOf(s)› et ‹indexOf(s, depart)› (renvoie -1 si absent) · ‹contains(s)› · ‹equals(s)› · ‹equalsIgnoreCase(s)› · ‹toLowerCase()› / ‹toUpperCase()› · ‹substring(debut, fin)› (fin exclue) · ‹split(\" \")› · ‹trim()› · ‹isEmpty()› · ‹matches(regex)›. Une String est immuable : ‹s.toLowerCase()› ne modifie pas s, il renvoie une nouvelle chaîne." },
      { h: "== ou equals ?", p: "‹==› compare les **références** (même objet en mémoire ?). ‹equals› compare le **contenu**. Deux littéraux \"Hello\" identiques partagent le même objet du pool de chaînes (s1 == s2 vaut true) mais ‹new String(\"Hello\")› crée un nouvel objet dans le tas (s1 == s3 vaut false). Règle d'or : toujours ‹equals› pour comparer des String.",
        code: R`String s1 = "Hello";              // pool de chaînes
String s2 = "Hello";              // même objet que s1
String s3 = new String("Hello");  // nouvel objet dans le tas
System.out.println(s1 == s2);      // true
System.out.println(s1 == s3);      // false : références différentes
System.out.println(s1.equals(s3)); // true  : même contenu` },
      { h: "Tableaux", p: "‹int[] t = new int[5];› crée 5 cases à 0 (objets : ‹null›). ‹t.length› sans parenthèses (‹s.length()› avec parenthèses pour String). Indices de 0 à length-1, sinon ‹ArrayIndexOutOfBoundsException›. Tableau 2D : ‹double[][] m = new double[lignes][colonnes];› et ‹m[i][j]›." },
      { h: "Classe, encapsulation, this, static", p: "Attributs ‹private›, accès par getters/setters ‹public›. ‹this.nom = nom;› distingue l'attribut du paramètre. Un attribut ‹static› est partagé par toutes les instances (un seul exemplaire, ex. compteur d'objets créés). Une méthode ‹static› s'appelle sur la classe : ‹Math.pow(x, 2)›.",
        code: R`public class Etudiant {
    private String nom;
    private int age;
    private static int nbEtudiants = 0;   // partagé

    public Etudiant(String nom, int age) {
        this.nom = nom;
        this.age = age;
        nbEtudiants++;
    }
    public String getNom() { return nom; }
    public void setAge(int age) {
        if (age >= 0 && age < 130) this.age = age;   // contrôle
    }
}` },
      { h: "Copie de référence", p: "‹int[] b = a;› ne copie pas le tableau : a et b désignent le même tableau, modifier b[0] modifie a[0]. Pour un ‹int› (type primitif), ‹int y = x;› copie la valeur." }
    ]
  },
  {
    id: "ch2", num: 2, tp: "TP2", titre: "Héritage, classes abstraites, polymorphisme, interfaces",
    sources: "TP2 (salariés/paye, université, location de voitures, magasin de médias) · Cours 3",
    fiche: [
      { h: "Héritage : extends et super", p: "‹class Vendeur extends Salarie› : Vendeur récupère attributs et méthodes de Salarie. Dans le constructeur, ‹super(...)› appelle le constructeur parent et doit être la **première instruction**. Les constructeurs s'exécutent du parent vers l'enfant. ‹protected› = visible dans les sous-classes." },
      { h: "Classe et méthode abstraites", p: "‹abstract class Salarie› ne peut pas être instanciée (‹new Salarie()› = erreur de compilation). Une méthode ‹abstract› n'a pas de corps (‹public abstract double calculerPaye();›) : chaque sous-classe concrète **doit** la redéfinir. C'est le schéma du TP2 : le calcul de la paye est différent pour chaque salarié, donc il est déclaré abstrait dans Salarie.",
        code: R`public abstract class Salarie extends Personne {
    public Salarie(String nom, String prenom) {
        super(nom, prenom);
    }
    public abstract double calculerPaye();   // pas de corps
}

public class Gestionnaire extends Salarie {
    private double fixe;
    public Gestionnaire(String nom, String prenom, double fixe) {
        super(nom, prenom);
        this.fixe = fixe;
    }
    @Override
    public double calculerPaye() { return fixe; }
}` },
      { h: "Redéfinition (override) ≠ surcharge (overload)", p: "**Redéfinition** : même nom, mêmes paramètres, dans une sous-classe (‹@Override›). **Surcharge** : même nom, paramètres différents (‹start()› et ‹start(int code)›). ‹super.methode()› appelle la version du parent. ‹final› sur une méthode interdit la redéfinition, sur une classe interdit l'héritage." },
      { h: "Polymorphisme (question du TP2)", p: "On peut ranger des Livre, CD, DVD dans une ‹ArrayList<Media>›. À l'exécution, Java appelle la méthode du **type réel** de l'objet (liaison dynamique), pas celle du type déclaré. Par contre, le compilateur n'autorise que les méthodes **déclarées dans le type de la variable** : ‹Media m = new CD(); m.getGroupe();› ne compile pas si getGroupe n'existe pas dans Media.",
        code: R`ArrayList<Media> medias = new ArrayList<>();
medias.add(new Livre("Dune", 2.0));
medias.add(new CD("Abbey Road", 1.5));
for (Media m : medias) {
    System.out.println(m.prixLocation(10));   // version Livre puis version CD
}` },
      { h: "instanceof et cast", p: "Pour utiliser une méthode spécifique (ex. volume utile d'un utilitaire) : tester ‹if (v instanceof Utilitaire)› puis caster ‹Utilitaire u = (Utilitaire) v;›. Sans test, un mauvais cast provoque ‹ClassCastException›. C'est la réponse du TP2 « critère de volume » : on ignore les petites voitures et routières." },
      { h: "Interfaces (TP2 université)", p: "Une interface décrit une **capacité** (‹SuitCours›, ‹Enseigne›, ‹MembreLabo›) : que des signatures de méthodes (+ constantes). Une classe ‹implements› une ou **plusieurs** interfaces mais n'‹extends› qu'une seule classe. Le Doctorant est une Personne qui suit des cours ET enseigne ET fait de la recherche : ‹class Doctorant extends Personne implements SuitCours, Enseigne, MembreLabo›.",
        code: R`public interface SuitCours {
    void suivreCours(Cours c);
}
public class Etudiant extends Personne implements SuitCours {
    @Override
    public void suivreCours(Cours c) { c.inscrire(this); }
}` },
      { h: "toString()", p: "Toute classe hérite de ‹Object›. ‹System.out.println(obj)› appelle ‹obj.toString()›. Sans redéfinition, on obtient ‹NomClasse@1b6d3586› (nom + code de hachage). Dans une sous-classe, on réutilise : ‹return super.toString() + \"\\nVolume utile : \" + volume;›" }
    ]
  },
  {
    id: "ch3", num: 3, tp: "TP3 (partie 1)", titre: "Exceptions",
    sources: "TP3 §1 (division, connexion, saisie d'une personne) · Cours 4 §3",
    fiche: [
      { h: "Vocabulaire", p: "**throw** (sans s) : lancer une exception, dans le corps : ‹throw new MonException(\"msg\");› · **throws** (avec s) : dans la signature, prévient que la méthode peut la laisser remonter : ‹public float division(int a, int b) throws DivisionException›. **try** : le code qui peut échouer. **catch** : le traitement. **finally** : exécuté dans tous les cas." },
      { h: "Créer sa propre exception", p: "On hérite de ‹Exception› (exception **vérifiée** : le compilateur oblige à la traiter ou à la déclarer) ou de ‹RuntimeException› (non vérifiée). Le message passe par ‹super(message)› et se récupère avec ‹getMessage()›.",
        code: R`public class AgeInvalideException extends Exception {
    public AgeInvalideException(int age) {
        super("Age invalide : " + age + " (doit etre entre 0 et 130)");
    }
}

public void setAge(int age) throws AgeInvalideException {
    if (age < 0 || age > 130) {
        throw new AgeInvalideException(age);
    }
    this.age = age;
}` },
      { h: "Attraper", p: "Dès qu'une exception est lancée, la suite du bloc ‹try› est **sautée**, on va dans le premier ‹catch› compatible, puis ‹finally›, puis le programme continue après. Si personne ne l'attrape, elle remonte la pile d'appels jusqu'au main (et le programme s'arrête avec la trace).",
        code: R`try {
    p.setAge(150);
    System.out.println("jamais affiché");
} catch (AgeInvalideException e) {
    System.out.println("Erreur : " + e.getMessage());
} finally {
    System.out.println("toujours affiché");
}` },
      { h: "Ordre des catch", p: "Du plus **spécifique** au plus **général**. Un ‹catch (Exception e)› placé avant ‹catch (IOException e)› rend le second inaccessible : erreur de compilation. Un catch d'une classe mère attrape aussi les filles (polymorphisme)." },
      { h: "Exceptions classiques à reconnaître", p: "‹ArithmeticException› (division entière par 0 : « / by zero » ; attention 10.0/0 donne Infinity, pas d'exception) · ‹NullPointerException› (appel de méthode sur null) · ‹ArrayIndexOutOfBoundsException› · ‹NumberFormatException› (‹Integer.parseInt(\"abc\")›) · ‹ClassCastException› · ‹InputMismatchException› (nextInt sur du texte) · ‹IOException› / ‹FileNotFoundException› (fichiers, vérifiées)." },
      { h: "Validation (TP3 connexion)", p: "Login uniquement des lettres : ‹login.matches(\"[a-zA-Z]+\")› (le + impose au moins une lettre). Mot de passe entre 8 et 16 inclus : ‹mdp.length() >= 8 && mdp.length() <= 16›. Saisie avec 10 essais : une boucle ‹while› qui contient le try/catch, un compteur d'erreurs, et un ‹throw› quand le compteur atteint 10." }
    ]
  },
  {
    id: "ch4", num: 4, tp: "TP3 (partie 2)", titre: "Collections, Comparator, génériques",
    sources: "TP3 §2 (employés TreeSet, polynômes) · TP2 partie D (sans doublon) · Cours 4 §1-2",
    fiche: [
      { h: "ArrayList<E> (liste ordonnée, doublons permis)", p: "‹add(e)› · ‹add(i, e)› · ‹get(i)› · ‹set(i, e)› · ‹remove(i)› ou ‹remove(objet)› · ‹size()› · ‹contains(e)› · ‹isEmpty()› · ‹indexOf(e)› · ‹clear()›. On déclare souvent avec l'interface : ‹List<String> l = new ArrayList<>();›. Les génériques n'acceptent que des objets : ‹ArrayList<Integer>›, pas ‹ArrayList<int>› (classes enveloppes Integer, Double… et autoboxing)." },
      { h: "Set : pas de doublons", p: "‹HashSet› (pas d'ordre garanti), ‹TreeSet› (trié). Réponse TP2 partie D : pour obtenir les personnes inscrites à au moins un cours sans doublon, on ajoute tout dans un ‹Set›. ‹add› renvoie false si l'élément est déjà présent." },
      { h: "TreeSet + Comparator (TP3 employés)", p: "Un TreeSet doit savoir **comparer** deux éléments pour les ranger. On lui donne un ‹Comparator<Employee>› : la méthode ‹compare(a, b)› renvoie un nombre **négatif** si a avant b, **0** si égaux, **positif** si a après b. On peut écrire plusieurs Comparator (par salaire, par nom…) sans toucher la classe Employee. ⚠ Si compare renvoie 0, le TreeSet considère que c'est un **doublon** et ne l'ajoute pas (deux employés au même salaire !).",
        code: R`import java.util.Comparator;

public class ComparateurSalaire implements Comparator<Employee> {
    @Override
    public int compare(Employee e1, Employee e2) {
        return Double.compare(e1.getSalaire(), e2.getSalaire());
    }
}

TreeSet<Employee> employes = new TreeSet<>(new ComparateurSalaire());` },
      { h: "Parcourir", p: "for-each : ‹for (Employee e : employes) { ... }›. Itérateur : ‹hasNext()›, ‹next()›, ‹remove()› — seule façon sûre de supprimer pendant le parcours (supprimer avec ‹liste.remove› dans un for-each lève ‹ConcurrentModificationException›).",
        code: R`Iterator<Integer> it = liste.iterator();
while (it.hasNext()) {
    int v = it.next();
    if (v < 0) it.remove();
}` },
      { h: "Map<K,V> : associer une clé à une valeur", p: "‹put(k, v)› (remplace si la clé existe) · ‹get(k)› (null si absente) · ‹containsKey(k)› · ‹getOrDefault(k, defaut)› · ‹keySet()› · ‹values()› · ‹entrySet()›. ‹TreeMap› trie les clés. Réponse TP3 polynômes : pour retrouver vite le monôme d'un degré donné, on utilise une ‹Map<Integer, Monome>› indexée par le degré." },
      { h: "Classes génériques", p: "‹class Pair<T> { private T first, second; ... }› puis ‹Pair<String> p = new Pair<>(\"a\", \"b\");›. Le joker ‹List<? extends Number>› accepte une liste de Integer, Double…" }
    ]
  },
  {
    id: "ch5", num: 5, tp: "TP4", titre: "Interfaces graphiques Swing",
    sources: "TP4 (JWindow/JDialog/JFrame, layouts, boutons, écouteurs, JTextField, JComboBox, JOptionPane, menus, calculatrice)",
    fiche: [
      { h: "La fenêtre type du TP4", p: "On crée une classe qui ‹extends JFrame›, on configure tout dans ‹build()›, et on lance l'interface dans le thread graphique avec ‹SwingUtilities.invokeLater›. Sans ‹setVisible(true)›, rien ne s'affiche.",
        code: R`public class Calculatrice extends JFrame {
    public Calculatrice() {
        super();
        build();
    }
    private void build() {
        setTitle("Calculatrice");
        setSize(300, 400);
        setLocationRelativeTo(null);            // centrée
        setResizable(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setContentPane(buildContentPane());
    }
    private JPanel buildContentPane() {
        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout());
        panel.add(new JLabel("Hello World !"));
        return panel;
    }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                Calculatrice f = new Calculatrice();
                f.setVisible(true);
            }
        });
    }
}` },
      { h: "Trois fenêtres", p: "**JWindow** : juste un conteneur, pas de barre de titre (splash screen). **JDialog** : boîte de dialogue, peut être **modale** (bloque la fenêtre principale). **JFrame** : fenêtre principale, barre de titre, menus, boutons fermer/agrandir/réduire, jamais modale." },
      { h: "Layouts (gestionnaires de placement)", p: "**FlowLayout** : à la suite sur une ligne, puis passe à la ligne (layout par défaut d'un JPanel). **BorderLayout** : 5 zones NORTH, SOUTH, EAST, WEST, CENTER. **GridLayout(lignes, colonnes)** : grille de cases toutes de même taille → **boutons d'une calculatrice**. **CardLayout** : couches superposées, une seule visible. **GridBagLayout** : le plus puissant et le plus complexe. Le positionnement absolu (x, y) est déconseillé." },
      { h: "Composants", p: "‹JLabel› (afficher : ‹setText›, ‹getText›) · ‹JButton› · ‹JTextField› (saisie 1 ligne : ‹getText()›, ‹setColumns(15)›) · ‹JTextArea› (plusieurs lignes) · ‹JComboBox› (‹addItem›, ‹removeItem›, ‹removeAllItems›, ‹getSelectedItem()›) · ‹JOptionPane.showMessageDialog(parent, msg)›, ‹showInputDialog(...)› (renvoie une **String** → ‹Double.parseDouble›), ‹showConfirmDialog(...)› (renvoie un **int** comparé à ‹JOptionPane.YES_OPTION›)." },
      { h: "Événements, technique 1 : ActionListener", p: "La fenêtre ‹implements ActionListener›, on l'enregistre sur chaque bouton avec ‹addActionListener(this)›, et on identifie le bouton cliqué avec ‹e.getSource()› dans ‹actionPerformed›. Un bouton sans écouteur ne déclenche rien.",
        code: R`public class Fenetre extends JFrame implements ActionListener {
    private JButton butt1, butt2;
    ...
    butt1 = new JButton("First button");
    butt1.addActionListener(this);      // la fenêtre écoute
    ...
    @Override
    public void actionPerformed(ActionEvent e) {
        Object source = e.getSource();
        if (source == butt1) System.out.println("bouton 1");
        else System.out.println("bouton 2");
    }
}` },
      { h: "Événements, technique 2 : AbstractAction", p: "Une classe séparée ‹extends AbstractAction›, le texte du bouton passe par ‹super(texte)›, le code va dans ‹actionPerformed›. Pour agir sur la fenêtre, l'action garde une **référence** vers elle (reçue dans le constructeur) et utilise ses getters.",
        code: R`public class ComboAction extends AbstractAction {
    private MaFenetre window;
    public ComboAction(MaFenetre w, String texte) {
        super(texte);
        window = w;
    }
    @Override
    public void actionPerformed(ActionEvent e) {
        Object selected = window.getList().getSelectedItem();
        window.getLabel().setText(selected.toString());
    }
}
// utilisation :  JButton b = new JButton(new ComboAction(this, "transfer"));` },
      { h: "Menus", p: "‹JMenuBar› contient des ‹JMenu›, qui contiennent des ‹JMenuItem›. On l'installe avec ‹setJMenuBar(menuBar)› (pas ‹add›). Un JMenuItem se construit comme un bouton : avec un texte + listener, ou avec une Action." }
    ]
  },
  {
    id: "ch6", num: 6, tp: "TP5", titre: "Fichiers",
    sources: "TP5 (File, FileWriter, Scanner sur fichier, notes d'étudiants, JFileChooser)",
    fiche: [
      { h: "La classe File", p: "‹new File(\"notes.txt\")› crée seulement un **objet** qui représente un chemin : le fichier n'est **pas** créé sur le disque ! Il faut ‹createNewFile()› (renvoie true si créé, false s'il existait déjà, et peut lever ‹IOException›). Autres méthodes : ‹exists()›, ‹delete()›, ‹getName()›, ‹getAbsolutePath()›, ‹length()› (taille en octets), ‹canRead()›, ‹canWrite()›, ‹list()›, ‹mkdir()›. File ne sait ni lire ni écrire." },
      { h: "Écrire : FileWriter", p: "‹new FileWriter(nom)› **écrase** le fichier ; ‹new FileWriter(nom, true)› **ajoute à la fin** (append). ‹write(texte)› puis **‹close()›** obligatoire (sinon les données peuvent rester dans le tampon et ne jamais être écrites). Tout ça dans un try/catch ‹IOException›.",
        code: R`try {
    FileWriter w = new FileWriter("notes.txt", true);
    w.write("Dupont Jean 12 16 11\n");
    w.close();
} catch (IOException e) {
    System.out.println("Erreur d'ecriture");
    e.printStackTrace();
}` },
      { h: "Lire : Scanner sur un File", p: "Même Scanner que pour le clavier, mais construit avec un File. Boucle ‹while (sc.hasNextLine())› + ‹nextLine()›. Le constructeur peut lever ‹FileNotFoundException›. Pour une ligne « Nom Prénom note1 note2 ... » : ‹split(\" \")› puis ‹Double.parseDouble(t[i])› à partir de l'indice 2.",
        code: R`try {
    Scanner sc = new Scanner(new File("notes.txt"));
    while (sc.hasNextLine()) {
        String ligne = sc.nextLine();
        String[] t = ligne.split(" ");   // t[0]=nom, t[1]=prenom, t[2..]=notes
        ...
    }
    sc.close();
} catch (FileNotFoundException e) {
    System.out.println("Fichier introuvable");
}` },
      { h: "JFileChooser", p: "Boîte de choix de fichier. Version classique : ‹int r = chooser.showOpenDialog(this); if (r == JFileChooser.APPROVE_OPTION) { File f = chooser.getSelectedFile(); }›. Version du TP5 : le chooser est ajouté dans la fenêtre avec un ActionListener, et ‹e.getActionCommand()› vaut ‹\"ApproveSelection\"› quand on valide (sinon annulation)." }
    ]
  },
  {
    id: "ch7", num: 7, tp: "TP6", titre: "Dessiner avec Java (Graphics2D)",
    sources: "TP6 (lignes, formes, image, texte)",
    fiche: [
      { h: "Principe", p: "Une classe ‹extends JPanel› redéfinit ‹paintComponent(Graphics g)›. On appelle **d'abord** ‹super.paintComponent(g)› (efface/repeint le fond), puis on dessine via un ‹Graphics2D› obtenu par cast. On ne l'appelle jamais soi-même : Swing l'appelle quand il faut ; pour forcer un nouveau dessin on appelle ‹repaint()›. La surface est ajoutée à une JFrame avec ‹add(new Surface())›.",
        code: R`class Surface extends JPanel {
    private void doDrawing(Graphics g) {
        Graphics2D g2d = (Graphics2D) g;
        g2d.drawLine(30, 30, 200, 30);
    }
    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        doDrawing(g);
    }
}` },
      { h: "Repère", p: "Origine (0, 0) **en haut à gauche**. x augmente vers la droite, **y augmente vers le bas**. Les formes rectangulaires se décrivent par le coin haut-gauche + largeur + hauteur." },
      { h: "Méthodes de dessin", p: "‹drawLine(x1, y1, x2, y2)› · ‹drawRect(x, y, l, h)› / ‹fillRect› (contour / plein) · ‹fillRoundRect(x, y, l, h, arcL, arcH)› · ‹fillOval(x, y, l, h)› (ellipse inscrite dans le rectangle ; cercle si l = h) · ‹fillArc(x, y, l, h, angleDepart, angleArc)› (degrés) · ‹fill(new Ellipse2D.Double(x, y, l, h))› · ‹drawString(texte, x, y)› (y = ligne de base du texte) · ‹drawImage(img, x, y, null)›." },
      { h: "Style", p: "Couleur : ‹g2d.setPaint(new Color(150, 150, 150))› ou ‹setColor(Color.RED)› (r, g, b de 0 à 255). Police : ‹g2d.setFont(new Font(\"Serif\", Font.BOLD, 20))›. Anti-crénelage : ‹RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)› puis ‹g2d.setRenderingHints(rh)›. Image : ‹new ImageIcon(\"logo.png\").getImage()›, taille avec ‹getWidth(null)›. ‹pack()› ajuste la fenêtre à la taille préférée du contenu." }
    ]
  },
  {
    id: "ch8", num: 8, tp: "TP7", titre: "Graphes et plus court chemin (Dijkstra)",
    sources: "TP7 / PlusCourtChemin (structure de graphe, algorithme, test avec fichier)",
    fiche: [
      { h: "Représenter un graphe valué", p: "Nœuds = villes, arêtes = routes avec une distance. Structure simple : une **liste d'adjacence** ‹Map<String, Map<String, Integer>>› : pour chaque ville, ses voisines et la distance. Graphe non orienté : on ajoute l'arête dans **les deux sens**. Alternative : classes ‹Noeud› et ‹Arete(depart, arrivee, poids)›, ou une matrice d'adjacence ‹int[][]›.",
        code: R`import java.util.*;

public class Graphe {
    private Map<String, Map<String, Integer>> voisins = new HashMap<>();

    public void ajouterArete(String a, String b, int poids) {
        voisins.putIfAbsent(a, new HashMap<>());
        voisins.putIfAbsent(b, new HashMap<>());
        voisins.get(a).put(b, poids);
        voisins.get(b).put(a, poids);   // non orienté
    }
}` },
      { h: "L'algorithme du TP (Dijkstra)", p: "1. d(départ) = 0, toutes les autres distances = infini (‹Integer.MAX_VALUE›). 2. Tous les nœuds non visités. 3. Tant qu'il reste des non visités : (a) prendre le nœud m non visité de **plus petite distance** ; pour chaque voisin x de m, si d(m) + poids(m, x) < d(x), remplacer d(x) ; (b) marquer m visité. Ne fonctionne qu'avec des poids **positifs**." },
      { h: "Faire tourner à la main (sur papier)", p: "Faites un tableau : une colonne par ville, une ligne par étape. À chaque étape : entourez le nœud choisi (plus petite distance non visitée), mettez à jour ses voisins, barrez-le. Attention au piège : ‹Integer.MAX_VALUE + poids› déborde et devient négatif — d'où le test « si la distance est infinie, on s'arrête »." },
      { h: "Lire le graphe depuis un fichier (lien TP5)", p: "Une ligne par arête « Belfort Sevenans 7 » : ‹String[] t = ligne.split(\" \"); g.ajouterArete(t[0], t[1], Integer.parseInt(t[2]));›" }
    ]
  }
];

window.EXOS = [
/* ======================= CHAPITRE 1 ======================= */
{ id: "c1-scanner", ch: "ch1", niveau: 1, type: "trous", titre: "Scanner : âge puis nom (TP1 §1)",
  consigne: "Complétez pour lire l'âge puis le nom, sans que la saisie du nom soit « sautée ».",
  code: R`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new «Scanner»(System.«in»);
        System.out.println("Votre age : ");
        int age = sc.«nextInt»();
        sc.«nextLine»();   // vide le buffer
        System.out.println("Votre nom : ");
        String nom = sc.nextLine();
        System.out.println("Vous vous appelez " + nom + " et vous avez " + age + " ans.");
    }
}`,
  explication: "nextInt() ne consomme pas le retour à la ligne : le nextLine() « à vide » l'absorbe, sinon le nom serait une chaîne vide.", wrap: "file" },

{ id: "c1-buffer-qcm", ch: "ch1", niveau: 1, type: "qcm", titre: "Le bug du buffer",
  consigne: "Après `int age = sc.nextInt();` on fait `String nom = sc.nextLine();`. L'utilisateur tape 20 puis Entrée. Que contient nom ?",
  options: ["\"20\"", "Une chaîne vide \"\" : nextLine lit le \\n laissé par nextInt", "null", "Le programme attend la saisie du nom normalement"],
  bonne: 1,
  explication: "nextInt lit « 20 » et laisse « \\n » dans le buffer. nextLine lit jusqu'au prochain \\n : il le trouve immédiatement et renvoie \"\"." },

{ id: "c1-string-eq", ch: "ch1", niveau: 1, type: "sortie", titre: "== contre equals (TP1 §3)",
  code: R`String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");
System.out.println(s1 == s2);
System.out.println(s1 == s3);
System.out.println(s1.equals(s3));
System.out.println(s3.equals("hello"));`,
  reponse: "true\nfalse\ntrue\nfalse",
  explication: "s1 et s2 désignent le même objet du pool de chaînes. new String crée un nouvel objet dans le tas : références différentes, donc == est false. equals compare le contenu, et il est sensible à la casse (\"hello\" ≠ \"Hello\").", wrap: "main" },

{ id: "c1-occ", ch: "ch1", niveau: 2, type: "sortie", titre: "Compter les occurrences (TP1 §3)",
  code: R`String texte = "banana";
String motif = "an";
int count = 0;
int pos = texte.indexOf(motif);
while (pos != -1) {
    count++;
    System.out.println("trouve en " + pos);
    pos = texte.indexOf(motif, pos + 1);
}
System.out.println(count);`,
  reponse: "trouve en 1\ntrouve en 3\n2",
  explication: "indexOf renvoie la position de la première occurrence (indices à partir de 0 : b=0, a=1, n=2…). indexOf(motif, pos+1) cherche à partir de la case suivante. Quand il n'y a plus rien, il renvoie -1 et la boucle s'arrête.", wrap: "main" },

{ id: "c1-voyelles", ch: "ch1", niveau: 2, type: "trous", titre: "Les 6 voyelles, insensible à la casse (TP1 §3)",
  consigne: "La méthode renvoie true si le mot contient a, e, i, o, u et y, même écrit en majuscules (\"RYTHME\").",
  code: R`public static boolean contientVoyelles(String mot) {
    String voyelles = "aeiouy";
    String m = mot.«toLowerCase()»;
    for (int i = 0; i < voyelles.«length()»; i++) {
        char c = voyelles.«charAt»(i);
        if (m.indexOf(c) == «-1») {
            return «false»;
        }
    }
    return true;
}`,
  explication: "On met tout en minuscules une fois (toLowerCase renvoie une nouvelle chaîne, il faut la récupérer). Dès qu'une voyelle est absente (indexOf = -1), on peut répondre false. Pour String : length() avec parenthèses.", wrap: "class" },

{ id: "c1-thermo", ch: "ch1", niveau: 2, type: "trous", titre: "Thermomètre défectueux (TP1 §2)",
  consigne: "Le taux d'erreur est tiré au hasard entre -0.5 et +0.5 à la création. Formule : C = (F − 32) / 1.8.",
  code: R`public class Thermometre {
    «private» double tauxErreur;

    public Thermometre() {
        tauxErreur = Math.«random»() - «0.5»;
    }

    public double celsiusVersFahrenheit(double c) {
        return c * 1.8 + «32» + tauxErreur;
    }

    public double fahrenheitVersCelsius(double f) {
        return (f - 32) / «1.8» + tauxErreur;
    }
}`,
  explication: "Math.random() ∈ [0 ; 1[ donc Math.random() − 0.5 ∈ [−0.5 ; 0.5[. Le taux est fixé une fois dans le constructeur (à l'instanciation), puis ajouté à chaque conversion. Attribut private = encapsulation.", wrap: "class" },

{ id: "c1-calc", ch: "ch1", niveau: 1, type: "sortie", titre: "Division entière et cast",
  code: R`int a = 7, b = 2;
System.out.println(a / b);
System.out.println(a % b);
System.out.println((double) a / b);
System.out.println(a / b * 2.0);
double d = 9.99;
int n = (int) d;
System.out.println(n);`,
  reponse: "3\n1\n3.5\n6.0\n9",
  explication: "7/2 entre deux int = 3 (partie entière). 7%2 = reste 1. (double) a / b : a est converti avant la division → 3.5. a / b * 2.0 : la division entière a lieu d'abord (3), puis 3 * 2.0 = 6.0. Le cast (int) tronque : 9.99 → 9.", wrap: "main" },

{ id: "c1-tab", ch: "ch1", niveau: 1, type: "sortie", titre: "Parcours de tableau",
  code: R`int[] t = {4, 8, 15, 16, 23};
int somme = 0;
for (int i = 0; i < t.length; i++) {
    if (t[i] % 2 == 0) {
        somme += t[i];
    }
}
System.out.println(somme);
System.out.println(t.length + " " + t[t.length - 1]);
int max = t[0];
for (int v : t) {
    if (v > max) max = v;
}
System.out.println("max=" + max);`,
  reponse: "28\n5 23\nmax=23",
  explication: "Somme des pairs : 4 + 8 + 16 = 28. length vaut 5, le dernier indice est 4 (t[4] = 23). Le for-each parcourt les valeurs.", wrap: "main" },

{ id: "c1-ref", ch: "ch1", niveau: 2, type: "sortie", titre: "Références et valeurs",
  code: R`int[] t1 = {1, 2, 3};
int[] t2 = t1;
t2[0] = 99;
int x = 5;
int y = x;
y = 10;
String s = "abc";
s.toUpperCase();
System.out.println(t1[0] + " " + x + " " + s);`,
  reponse: "99 5 abc",
  explication: "t2 = t1 copie la référence : un seul tableau, donc t1[0] devient 99. y = x copie la valeur d'un int : x reste 5. Une String est immuable : toUpperCase() renvoie une nouvelle chaîne qui est ici perdue, s vaut toujours \"abc\".", wrap: "main" },

{ id: "c1-static", ch: "ch1", niveau: 2, type: "sortie", titre: "Attribut static (cours 2)",
  code: R`class Car {
    public static int nbCars = 0;
    private int numero;

    public Car() {
        nbCars++;
        numero = nbCars;
    }
    public int getNumero() { return numero; }
}

public class Main {
    public static void main(String[] args) {
        Car a = new Car();
        Car b = new Car();
        Car c = new Car();
        System.out.println(Car.nbCars);
        System.out.println(a.getNumero() + " " + c.getNumero());
    }
}`,
  reponse: "3\n1 3",
  explication: "nbCars est static : un seul exemplaire partagé, incrémenté à chaque new. numero est un attribut d'instance : chaque voiture garde la valeur du compteur au moment de sa création.", wrap: "file" },

{ id: "c1-audit", ch: "ch1", niveau: 2, type: "multi", titre: "Audit de code IA : classe Groupe (TP1 §4)",
  consigne: "Code du TP1 :\n\nclass Etudiant { public String nom; public String prenom; public int age; ... }\nclass Groupe {\n  public Etudiant[] liste;\n  chercherParNom : if (liste[i] != null && liste[i].nom == nomRecherche) return liste[i];\n  calculAgeMoyen : for (...) somme = somme + liste[i].age;  return somme / liste.length;\n}\n\nCochez les 3 vraies erreurs.",
  options: [
    "Attributs public : l'encapsulation n'est pas respectée (il faut private + getters)",
    "Comparaison de String avec == au lieu de equals",
    "calculAgeMoyen plante (NullPointerException) si des cases du tableau sont vides (null), et divise par la taille du tableau au lieu du nombre d'étudiants",
    "La boucle for doit aller jusqu'à i <= liste.length",
    "Un constructeur doit toujours être static",
    "On ne peut pas créer un tableau d'objets Etudiant en Java"
  ],
  bonnes: [0, 1, 2],
  explication: "1) Encapsulation : attributs private + getters/setters. 2) == compare les références : deux String de même contenu peuvent être des objets différents → equals. 3) Un tableau d'objets créé avec new Etudiant[taille] contient null partout : liste[i].age lève NullPointerException ; il faut tester != null et compter les étudiants réels. i <= length dépasserait le tableau." },

{ id: "c1-audit-fix", ch: "ch1", niveau: 2, type: "trous", titre: "Audit Groupe : version corrigée",
  code: R`class Groupe {
    «private» Etudiant[] liste;

    public Groupe(int tailleMax) {
        liste = new Etudiant[tailleMax];
    }

    public Etudiant chercherParNom(String nomRecherche) {
        for (int i = 0; i < liste.length; i++) {
            if (liste[i] != null && liste[i].getNom().«equals»(nomRecherche)) {
                return liste[i];
            }
        }
        return «null»;
    }

    public double calculAgeMoyen() {
        double somme = 0;
        int nb = 0;
        for (int i = 0; i < liste.length; i++) {
            if (liste[i] «!=» null) {
                somme = somme + liste[i].getAge();
                «nb++¦nb += 1¦nb = nb + 1¦++nb»;
            }
        }
        if (nb == 0) return 0;
        return somme / «nb»;
    }
}`,
  avant: R`class Etudiant {
    private String nom; private int age;
    public Etudiant(String n, int a) { nom = n; age = a; }
    public String getNom() { return nom; }
    public int getAge() { return age; }
}`,
  explication: "On ne compte que les cases non nulles, et on protège la division par zéro si le groupe est vide.", wrap: "class" },

{ id: "c1-matrice", ch: "ch1", niveau: 3, type: "trous", titre: "Matrices de capteurs : addition sécurisée (TP1 §5)",
  consigne: "Si une case de la somme est négative, on la force à 0 et on affiche l'alerte.",
  code: R`public class Matrice {
    private int lignes, colonnes;
    private double[][] valeurs;

    public Matrice(int lignes, int colonnes) {
        this.lignes = lignes;
        this.colonnes = colonnes;
        valeurs = new «double»[lignes][colonnes];
    }

    public Matrice additionner(Matrice autre) {
        Matrice res = new Matrice(lignes, colonnes);
        for (int i = 0; i < «lignes»; i++) {
            for (int j = 0; j < «colonnes»; j++) {
                double s = this.valeurs[i][j] + autre.valeurs[i][j];
                if (s «<» 0) {
                    s = 0;
                    System.out.println("[ALERTE] Defaillance du capteur a la position (" + i + ", " + j + ") corrigee.");
                }
                res.valeurs[i][j] = s;
            }
        }
        return «res»;
    }
}`,
  explication: "Double boucle imbriquée : i parcourt les lignes, j les colonnes. Une classe peut accéder aux attributs private d'un autre objet de la même classe (autre.valeurs).", wrap: "class" },

{ id: "c1-matprod", ch: "ch1", niveau: 3, type: "sortie", titre: "Produit de matrices (TP1 §5)",
  code: R`int[][] a = {{1, 2}, {3, 4}};
int[][] b = {{0, 1}, {1, 0}};
int[][] c = new int[2][2];
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        for (int k = 0; k < 2; k++) {
            c[i][j] += a[i][k] * b[k][j];
        }
    }
}
for (int i = 0; i < 2; i++) {
    System.out.println(c[i][0] + " " + c[i][1]);
}`,
  reponse: "2 1\n4 3",
  explication: "c[i][j] = somme sur k de a[i][k] × b[k][j]. c[0][0] = 1×0 + 2×1 = 2 ; c[0][1] = 1×1 + 2×0 = 1 ; c[1][0] = 3×0 + 4×1 = 4 ; c[1][1] = 3. Multiplier par b échange ici les colonnes.", wrap: "main" },

{ id: "c1-concat", ch: "ch1", niveau: 2, type: "sortie", titre: "Piège : + entre nombres et chaînes",
  code: R`int a = 2, b = 3;
System.out.println(a + b + " total");
System.out.println("total " + a + b);
System.out.println("total " + (a + b));
System.out.println(1 + 2 + "3" + 4 + 5);
char c = 'A';
System.out.println(c + 1);
System.out.println("" + c + 1);`,
  reponse: "5 total\ntotal 23\ntotal 5\n3345\n66\nA1",
  explication: "Le + s'évalue de gauche à droite : tant qu'on n'a que des nombres, c'est une addition ; dès qu'une String apparaît, tout ce qui suit est concaténé. 1+2 = 3, puis \"3\"+\"3\" = \"33\", puis \"334\", \"3345\". Un char + un int donne un int (code de 'A' = 65, donc 66).", wrap: "main" },

{ id: "c1-encaps-qcm", ch: "ch1", niveau: 1, type: "qcm", titre: "Rôle de this",
  consigne: "Dans `public Etudiant(String nom) { this.nom = nom; }`, que désigne this.nom ?",
  options: ["Le paramètre nom", "L'attribut nom de l'objet en cours de construction", "Une variable static", "La classe Etudiant"],
  bonne: 1,
  explication: "this désigne l'objet courant. Sans this, « nom = nom » affecterait le paramètre à lui-même et l'attribut resterait null." },

/* ======================= CHAPITRE 2 ======================= */
{ id: "c2-salarie", ch: "ch2", niveau: 1, type: "trous", titre: "Hiérarchie des salariés (TP2 §1)",
  code: R`public abstract class Personne {
    «protected» String nom;
    protected String prenom;

    public Personne(String nom, String prenom) {
        «this».nom = nom;
        this.prenom = prenom;
    }
}

public «abstract» class Salarie «extends» Personne {
    public Salarie(String nom, String prenom) {
        «super(nom, prenom)»;
    }
    public «abstract» double calculerPaye();
}

public class Vendeur extends Salarie {
    private double fixe, ventes;

    public Vendeur(String nom, String prenom, double fixe, double ventes) {
        super(nom, prenom);
        this.fixe = fixe;
        this.ventes = ventes;
    }

    «@Override»
    public double calculerPaye() {
        return fixe + ventes * «0.01»;
    }
}`,
  explication: "Salarie est abstraite car « un salarié » sans catégorie n'existe pas et que le calcul de paye dépend du type : la méthode est abstraite dans Salarie et redéfinie dans chaque sous-classe. super(...) appelle le constructeur de Personne. Prime vendeur = 1 % = 0.01.", wrap: "class" },

{ id: "c2-technicien", ch: "ch2", niveau: 2, type: "trous", titre: "Technicien : heures supplémentaires +30 %",
  code: R`public class Technicien extends Salarie {
    public static final int HEURES_NORMALES = 151;
    private double tauxHoraire;
    private double heures;

    public Technicien(String nom, String prenom, double taux, double heures) {
        super(nom, prenom);
        tauxHoraire = taux;
        this.heures = heures;
    }

    @Override
    public double calculerPaye() {
        if (heures «<=» HEURES_NORMALES) {
            return heures * tauxHoraire;
        }
        double supp = heures - «HEURES_NORMALES»;
        return HEURES_NORMALES * tauxHoraire + supp * tauxHoraire * «1.3»;
    }
}`,
  avant: R`abstract class Salarie {
    protected String nom, prenom;
    public Salarie(String n, String p) { nom = n; prenom = p; }
    public abstract double calculerPaye();
}`,
  explication: "Majoration de 30 % → on multiplie le taux par 1.3 pour les seules heures au-delà du seuil. static final = constante partagée.", wrap: "class" },

{ id: "c2-paye-sortie", ch: "ch2", niveau: 2, type: "sortie", titre: "Polymorphisme : la paye de chacun",
  code: R`import java.util.ArrayList;

abstract class Salarie {
    protected String nom;
    public Salarie(String nom) { this.nom = nom; }
    public abstract double calculerPaye();
    public String toString() { return nom + " : " + calculerPaye(); }
}
class Gestionnaire extends Salarie {
    private double fixe;
    public Gestionnaire(String n, double f) { super(n); fixe = f; }
    public double calculerPaye() { return fixe; }
}
class Secretaire extends Salarie {
    private double taux; private int heures;
    public Secretaire(String n, double t, int h) { super(n); taux = t; heures = h; }
    public double calculerPaye() {
        if (heures <= 150) return heures * taux;
        return 150 * taux + (heures - 150) * taux * 1.2;
    }
}

public class Main {
    public static void main(String[] args) {
        ArrayList<Salarie> liste = new ArrayList<>();
        liste.add(new Gestionnaire("Ana", 3000));
        liste.add(new Secretaire("Bob", 10, 160));
        liste.add(new Secretaire("Cid", 10, 100));
        double total = 0;
        for (Salarie s : liste) {
            System.out.println(s);
            total += s.calculerPaye();
        }
        System.out.println("Total = " + total);
    }
}`,
  reponse: "Ana : 3000.0\nBob : 1620.0\nCid : 1000.0\nTotal = 5620.0",
  explication: "println(s) appelle toString(), qui appelle calculerPaye() : la version exécutée est celle du type réel (Gestionnaire ou Secretaire). Bob : 150×10 + 10×10×1.2 = 1500 + 120 = 1620. Un double s'affiche toujours avec « .0 ».", wrap: "file" },

{ id: "c2-animaux", ch: "ch2", niveau: 2, type: "sortie", titre: "Redéfinition et super (cours 3)",
  code: R`class Animal {
    public String cri() { return "..."; }
    public String presentation() { return "Je dis " + cri(); }
}
class Chien extends Animal {
    @Override
    public String cri() { return "Wouf"; }
}
class Chat extends Animal {
    @Override
    public String cri() { return "Miaou"; }
    @Override
    public String presentation() { return "Chat. " + super.presentation(); }
}

public class Main {
    public static void main(String[] args) {
        Animal[] zoo = { new Animal(), new Chien(), new Chat() };
        for (Animal a : zoo) {
            System.out.println(a.presentation());
        }
    }
}`,
  reponse: "Je dis ...\nJe dis Wouf\nChat. Je dis Miaou",
  explication: "Chien n'a pas redéfini presentation() : c'est celle d'Animal qui s'exécute, mais l'appel cri() à l'intérieur est lui aussi polymorphe → « Wouf ». Chat ajoute « Chat. » puis appelle la version parente via super, qui appelle cri() de Chat.", wrap: "file" },

{ id: "c2-constructeurs", ch: "ch2", niveau: 2, type: "sortie", titre: "Ordre des constructeurs",
  code: R`class A {
    public A() { System.out.println("A"); }
}
class B extends A {
    public B() { System.out.println("B"); }
}
class C extends B {
    public C(int x) {
        super();
        System.out.println("C" + x);
    }
}

public class Main {
    public static void main(String[] args) {
        new C(1);
        new B();
    }
}`,
  reponse: "A\nB\nC1\nA\nB",
  explication: "Tout constructeur commence par appeler celui du parent (super() implicite s'il n'est pas écrit). Construire un C exécute donc A, puis B, puis C.", wrap: "file" },

{ id: "c2-compil-qcm", ch: "ch2", niveau: 2, type: "qcm", titre: "Type déclaré et type réel",
  consigne: "Personne p = new Etudiant(\"Lea\", \"Durand\");\np.suivreCours(cours);   // suivreCours est définie seulement dans Etudiant\n\nQue se passe-t-il ?",
  options: ["Ça compile et ça appelle suivreCours d'Etudiant", "Erreur de compilation : la méthode n'existe pas dans le type déclaré Personne", "ClassCastException à l'exécution", "NullPointerException"],
  bonne: 1,
  explication: "Le compilateur ne regarde que le type déclaré (Personne). Il faut caster : ((Etudiant) p).suivreCours(cours), idéalement après un test instanceof." },

{ id: "c2-abstract-qcm", ch: "ch2", niveau: 1, type: "qcm", titre: "Instancier une classe abstraite",
  consigne: "Salarie est déclarée `public abstract class Salarie`. Que fait `Salarie s = new Salarie(\"A\", \"B\");` ?",
  options: ["Crée un salarié sans paye", "Erreur de compilation", "Erreur à l'exécution", "Crée un Vendeur par défaut"],
  bonne: 1,
  explication: "On ne peut jamais faire new sur une classe abstraite. Par contre Salarie s = new Vendeur(...) est autorisé (type déclaré abstrait, type réel concret)." },

{ id: "c2-interfaces", ch: "ch2", niveau: 2, type: "trous", titre: "Université : interfaces (TP2 §2)",
  consigne: "Un doctorant fait de la recherche, peut enseigner et suivre des cours.",
  code: R`public «interface» SuitCours {
    void suivreCours(Cours c);
}

public interface Enseigne {
    void intervenir(Cours c);
}

public class Doctorant «extends» Personne «implements» SuitCours, Enseigne {
    public Doctorant(String nom, String prenom) {
        super(nom, prenom);
    }
    @Override
    public void suivreCours(Cours c) { c.inscrire(this); }
    @Override
    public void intervenir(Cours c) { c.ajouterIntervenant(this); }
}`,
  avant: R`abstract class Personne {
    protected String nom, prenom;
    public Personne(String n, String p) { nom = n; prenom = p; }
}
class Cours {
    private java.util.ArrayList<Personne> inscrits = new java.util.ArrayList<>();
    private java.util.ArrayList<Personne> intervenants = new java.util.ArrayList<>();
    public void inscrire(Personne p) { inscrits.add(p); }
    public void ajouterIntervenant(Personne p) { intervenants.add(p); }
}`,
  explication: "Java n'a pas d'héritage multiple de classes : une seule classe après extends, mais plusieurs interfaces après implements (séparées par des virgules). Les interfaces représentent des capacités partagées par des classes de branches différentes.", wrap: "class" },

{ id: "c2-interface-qcm", ch: "ch2", niveau: 1, type: "qcm", titre: "Héritage ou interface ?",
  consigne: "Quelle déclaration est INTERDITE en Java ?",
  options: ["class Doctorant extends Personne implements SuitCours, Enseigne", "class Doctorant extends Etudiant, Enseignant", "interface Enseigne extends Intervenant", "class Chercheur extends Personne implements MembreLabo"],
  bonne: 1,
  explication: "Une classe ne peut étendre qu'une seule classe. Une interface peut, elle, étendre une autre interface." },

{ id: "c2-tostring", ch: "ch2", niveau: 1, type: "trous", titre: "toString des véhicules (TP2 §3)",
  code: R`public class Vehicule {
    protected String marque, nom, couleur;
    protected int nbPlaces;
    protected double prixKm;

    public Vehicule(String marque, String nom, String couleur, int nbPlaces, double prixKm) {
        this.marque = marque; this.nom = nom; this.couleur = couleur;
        this.nbPlaces = nbPlaces; this.prixKm = prixKm;
    }

    @Override
    public «String» toString() {
        return "Marque : " + marque + "\nNom : " + nom + "\nCouleur : " + couleur
             + "\nNombre de places : " + nbPlaces + "\nPrix au km : " + prixKm;
    }
}

public class Utilitaire «extends» Vehicule {
    private double volumeUtile;

    public Utilitaire(String marque, String nom, String couleur, int places, double prix, double volume) {
        «super(marque, nom, couleur, places, prix)»;
        volumeUtile = volume;
    }

    @Override
    public String toString() {
        return «super.toString()» + "\nVolume utile : " + volumeUtile;
    }
}`,
  explication: "Les attributs communs sont dans Vehicule (pas de duplication). L'utilitaire réutilise l'affichage du parent avec super.toString() et ajoute son attribut spécifique.", wrap: "class" },

{ id: "c2-recherche", ch: "ch2", niveau: 3, type: "trous", titre: "Recherche par volume utile sans erreur (TP2 §3 C)",
  consigne: "Utilitaire et Camionnette implémentent l'interface AvecChargement (méthode getVolumeUtile()). Les petites voitures et routières doivent être ignorées.",
  code: R`public ArrayList<Vehicule> parVolumeMin(double v) {
    ArrayList<Vehicule> res = new ArrayList<>();
    for («Vehicule» veh : parc) {
        if (veh «instanceof» AvecChargement) {
            AvecChargement c = («AvecChargement») veh;
            if (c.getVolumeUtile() «>=» v) {
                res.«add»(veh);
            }
        }
    }
    return res;
}`,
  avant: R`interface AvecChargement { double getVolumeUtile(); }
class Vehicule { }
class Main {
    java.util.ArrayList<Vehicule> parc = new java.util.ArrayList<>();`,
  apres: "}",
  imports: "import java.util.ArrayList;",
  explication: "instanceof évite la ClassCastException : on ne caste que les véhicules qui ont réellement un espace de chargement.", wrap: "class" },

{ id: "c2-media", ch: "ch2", niveau: 3, type: "sortie", titre: "Prix de location des médias (TP2 §4 E)",
  code: R`abstract class Media {
    protected String titre;
    protected double prix;
    public Media(String t, double p) { titre = t; prix = p; }
    public abstract double prixLocation(int jours);
}
class CD extends Media {
    public CD(String t, double p) { super(t, p); }
    public double prixLocation(int jours) { return prix * jours; }
}
class Livre extends Media {
    public Livre(String t, double p) { super(t, p); }
    public double prixLocation(int jours) {
        int semaines = (jours + 6) / 7;
        return prix * semaines;
    }
}

public class Main {
    public static void main(String[] args) {
        Media[] m = { new CD("Thriller", 1.5), new Livre("Dune", 2) };
        for (Media x : m) {
            System.out.println(x.titre + " " + x.prixLocation(10));
        }
        System.out.println(new Livre("Ca", 3).prixLocation(7));
    }
}`,
  reponse: "Thriller 15.0\nDune 4.0\n3.0",
  explication: "CD facturé à la journée : 1.5 × 10 = 15.0. Livre à la semaine : (10 + 6) / 7 = 16 / 7 = 2 en division entière (on arrondit au supérieur), donc 2 × 2 = 4.0. Pour 7 jours : 13 / 7 = 1 semaine → 3.0.", wrap: "file" },

{ id: "c2-louer", ch: "ch2", niveau: 2, type: "trous", titre: "Louer un média avec contrôles (TP2 §4 D)",
  code: R`public void louer(String titre, Loueur l) {
    Media m = rechercher(titre);
    if (m == «null») {
        System.out.println("Erreur : le media " + titre + " n'existe pas");
        return;
    }
    if (!loueurs.«contains»(l)) {
        System.out.println("Erreur : loueur inconnu");
        return;
    }
    if (m.«isLoue»()) {
        System.out.println("Erreur : " + titre + " est deja loue");
        return;
    }
    m.setLoue(«true»);
    l.getLocations().«add»(m);
}`,
  avant: R`class Media {
    private boolean loue;
    public boolean isLoue() { return loue; }
    public void setLoue(boolean b) { loue = b; }
}
class Loueur {
    private java.util.ArrayList<Media> locations = new java.util.ArrayList<>();
    public java.util.ArrayList<Media> getLocations() { return locations; }
}
class Magasin {
    private java.util.ArrayList<Loueur> loueurs = new java.util.ArrayList<>();
    private Media rechercher(String t) { return null; }`,
  apres: "}",
  explication: "Les trois cas d'erreur du TP : média inexistant (rechercher renvoie null), loueur inconnu, média déjà loué. Le return arrête la méthode après le message. Getter d'un boolean : isXxx().", wrap: "class" },

{ id: "c2-labo", ch: "ch2", niveau: 2, type: "sortie", titre: "Laboratoire : membres par catégorie (TP2 §2 C)",
  code: R`import java.util.ArrayList;

abstract class Personne {
    protected String nom;
    public Personne(String n) { nom = n; }
}
class Chercheur extends Personne { public Chercheur(String n) { super(n); } }
class Doctorant extends Personne { public Doctorant(String n) { super(n); } }

class Laboratoire {
    private ArrayList<Personne> membres = new ArrayList<>();
    public void ajouter(Personne p) { membres.add(p); }
    public void supprimer(Personne p) { membres.remove(p); }
    public void afficherParCategorie() {
        int nbChercheurs = 0, nbDoctorants = 0;
        for (Personne p : membres) {
            if (p instanceof Chercheur) nbChercheurs++;
            else if (p instanceof Doctorant) nbDoctorants++;
        }
        System.out.println("Chercheurs : " + nbChercheurs + ", Doctorants : " + nbDoctorants);
    }
}

public class Main {
    public static void main(String[] args) {
        Laboratoire labo = new Laboratoire();
        Personne a = new Chercheur("Ana");
        Personne b = new Doctorant("Bob");
        labo.ajouter(a);
        labo.ajouter(b);
        labo.ajouter(new Doctorant("Cid"));
        labo.afficherParCategorie();
        labo.supprimer(b);
        labo.supprimer(new Chercheur("Ana"));
        labo.afficherParCategorie();
    }
}`,
  reponse: "Chercheurs : 1, Doctorants : 2\nChercheurs : 1, Doctorants : 1",
  explication: "instanceof permet de compter par catégorie. remove(b) supprime bien Bob (même objet). Mais new Chercheur(\"Ana\") est un NOUVEL objet : sans redéfinition de equals, remove compare les références et ne trouve rien. Ana reste donc dans le labo.", wrap: "file" },

{ id: "c2-poly-qcm", ch: "ch2", niveau: 1, type: "qcm", titre: "Comment Java choisit la bonne méthode ?",
  consigne: "Une ArrayList<Media> contient des Livre, CD, DVD. On appelle m.prixLocation(5) pour chacun. Comment Java choisit-il le calcul ?",
  options: ["Il exécute toujours la méthode de Media", "Il regarde le type réel de l'objet à l'exécution (liaison dynamique)", "Il faut obligatoirement tester instanceof avant chaque appel", "Il choisit selon l'ordre d'ajout dans la liste"],
  bonne: 1,
  explication: "C'est le polymorphisme : la méthode redéfinie dans la classe réelle de l'objet est choisie à l'exécution. Media déclare la méthode (abstraite) pour que l'appel compile." },

{ id: "c2-surcharge-qcm", ch: "ch2", niveau: 2, type: "qcm", titre: "Surcharge ou redéfinition ?",
  consigne: "class Car { public void start() {...} }\nclass CodedCar extends Car { public void start(int code) {...} }\n\nLa méthode start(int code) de CodedCar est :",
  options: ["Une redéfinition (override) de start()", "Une surcharge (overload) : même nom, paramètres différents", "Une erreur de compilation", "Une méthode abstraite"],
  bonne: 1,
  explication: "Paramètres différents → surcharge : CodedCar possède les deux méthodes start() et start(int). Une redéfinition exige exactement la même signature." },

{ id: "c2-tostring-qcm", ch: "ch2", niveau: 1, type: "qcm", titre: "println d'un objet",
  consigne: "La classe Vehicule ne redéfinit pas toString(). Qu'affiche System.out.println(new Vehicule(...)) ?",
  options: ["Tous les attributs du véhicule", "Quelque chose comme Vehicule@1b6d3586", "null", "Une erreur de compilation"],
  bonne: 1,
  explication: "C'est le toString() hérité d'Object : nom de la classe + @ + code de hachage en hexadécimal." },

/* ======================= CHAPITRE 3 ======================= */
{ id: "c3-division", ch: "ch3", niveau: 1, type: "trous", titre: "Division par zéro (TP3 §1.1)",
  code: R`class DivisionParZeroException «extends» Exception {
    private int diviseur;
    public DivisionParZeroException(int d) {
        «super»("Division par zero impossible");
        diviseur = d;
    }
    public int getDiviseur() { return diviseur; }
}

class Calcul {
    public float division(int dividende, int diviseur) «throws» DivisionParZeroException {
        if (diviseur == 0) {
            «throw» new DivisionParZeroException(diviseur);
        }
        return «(float)» dividende / diviseur;
    }
}

public class Main {
    public static void main(String[] args) {
        Calcul calc = new Calcul();
        «try» {
            System.out.println(calc.division(10, 2));
            System.out.println(calc.division(10, 0));
        } «catch» (DivisionParZeroException e) {
            System.out.println(e.«getMessage»() + " (diviseur = " + e.getDiviseur() + ")");
        }
    }
}`,
  explication: "throws dans la signature, throw new … dans le corps. Le message est transmis à Exception par super(...) et relu par getMessage(). Le cast (float) évite la division entière (10/2 affiche 5.0).", wrap: "file" },

{ id: "c3-finally", ch: "ch3", niveau: 2, type: "sortie", titre: "try / catch / finally",
  code: R`public class Main {
    static int test(int x) {
        try {
            System.out.println("debut");
            if (x == 0) {
                throw new IllegalArgumentException("x nul");
            }
            System.out.println("fin try");
            return 10 / x;
        } catch (IllegalArgumentException e) {
            System.out.println("catch : " + e.getMessage());
            return -1;
        } finally {
            System.out.println("finally");
        }
    }

    public static void main(String[] args) {
        System.out.println(test(2));
        System.out.println(test(0));
    }
}`,
  reponse: "debut\nfin try\nfinally\n5\ndebut\ncatch : x nul\nfinally\n-1",
  explication: "finally s'exécute toujours, même quand on fait return dans le try ou le catch (avant que la valeur soit rendue à l'appelant, d'où l'ordre). Après le throw, « fin try » est sauté.", wrap: "file" },

{ id: "c3-arith", ch: "ch3", niveau: 2, type: "sortie", titre: "Division par 0 : int ou double ?",
  code: R`try {
    System.out.println(10.0 / 0);
    System.out.println(10 / 0);
    System.out.println("jamais");
} catch (ArithmeticException e) {
    System.out.println("Erreur : " + e.getMessage());
}
System.out.println("suite");`,
  reponse: "Infinity\nErreur : / by zero\nsuite",
  explication: "Entre réels, 10.0/0 donne Infinity sans exception. Entre entiers, 10/0 lève ArithmeticException (message « / by zero ») : la ligne « jamais » est sautée. Après le catch, le programme continue.", wrap: "main" },

{ id: "c3-propagation", ch: "ch3", niveau: 2, type: "sortie", titre: "Une exception remonte la pile",
  code: R`public class Main {
    static void a() throws Exception {
        System.out.println("a1");
        b();
        System.out.println("a2");
    }
    static void b() throws Exception {
        System.out.println("b1");
        throw new Exception("boom");
    }
    public static void main(String[] args) {
        try {
            a();
            System.out.println("main fin");
        } catch (Exception e) {
            System.out.println("attrapee : " + e.getMessage());
        }
        System.out.println("suite");
    }
}`,
  reponse: "a1\nb1\nattrapee : boom\nsuite",
  explication: "b lance l'exception, ni b ni a ne l'attrapent (ils la déclarent avec throws) : elle remonte jusqu'au try du main. Tout ce qui suit l'appel est sauté (« a2 », « main fin »).", wrap: "file" },

{ id: "c3-login", ch: "ch3", niveau: 2, type: "trous", titre: "Connexion : login et mot de passe (TP3 §1.2)",
  code: R`public static void verifier(String login, String mdp)
        throws LoginException, MotDePasseException {
    if (!login.«matches»("[a-zA-Z]+")) {
        throw new LoginException("Le login ne doit contenir que des lettres");
    }
    if (mdp.«length()» < 8 «||» mdp.length() > «16») {
        throw new MotDePasseException("Le mot de passe doit faire entre 8 et 16 caracteres");
    }
}`,
  avant: R`class LoginException extends Exception { public LoginException(String m) { super(m); } }
class MotDePasseException extends Exception { public MotDePasseException(String m) { super(m); } }
class Main {`,
  apres: "}",
  explication: "[a-zA-Z]+ : une ou plusieurs lettres, rien d'autre (matches teste toute la chaîne). Invalide si trop court OU trop long : on utilise ||. Les bornes 8 et 16 sont acceptées (inclus).", wrap: "class" },

{ id: "c3-regex", ch: "ch3", niveau: 1, type: "sortie", titre: "Tester des logins",
  code: R`String[] logins = {"Dupont", "Dupont123", "", "de Gaulle"};
for (String l : logins) {
    System.out.println(l.matches("[a-zA-Z]+"));
}
System.out.println("abcdefgh".length() >= 8);`,
  reponse: "true\nfalse\nfalse\nfalse\ntrue",
  explication: "Les chiffres et l'espace ne sont pas des lettres. La chaîne vide échoue car + exige au moins un caractère. \"abcdefgh\" a 8 caractères.", wrap: "main" },

{ id: "c3-tentatives", ch: "ch3", niveau: 3, type: "trous", titre: "Saisie avec 10 tentatives max (TP3 §1.3)",
  consigne: "NomVideException et AgeInvalideException héritent toutes deux de SaisieException.",
  code: R`public static Personne saisirAvecTentatives(Scanner sc) throws TropDeTentativesException {
    int erreurs = 0;
    while (true) {
        try {
            Personne p = saisirPersonne(sc);   // peut lancer une SaisieException
            return p;
        } catch («SaisieException» e) {
            System.out.println(e.getMessage() + " : recommencez");
            «erreurs++¦erreurs += 1¦erreurs = erreurs + 1¦++erreurs»;
            if (erreurs «>=» 10) {
                «throw» new TropDeTentativesException();
            }
        }
    }
}`,
  avant: R`import java.util.Scanner;
class SaisieException extends Exception { public SaisieException(String m) { super(m); } }
class TropDeTentativesException extends Exception { }
class Personne { }
class Main {
    static Personne saisirPersonne(Scanner sc) throws SaisieException { return new Personne(); }`,
  apres: "}",
  explication: "Le try/catch est DANS la boucle : une erreur ne stoppe pas le programme, on recommence. Attraper la classe mère SaisieException suffit pour les deux erreurs (polymorphisme des exceptions). Au 10e échec, on lance une exception de niveau supérieur.", wrap: "class" },

{ id: "c3-ordre-qcm", ch: "ch3", niveau: 2, type: "qcm", titre: "Ordre des catch",
  consigne: "try { ... }\ncatch (Exception e) { ... }\ncatch (FileNotFoundException e) { ... }\n\nQue se passe-t-il ?",
  options: ["Tout fonctionne, le premier catch compatible est utilisé", "Erreur de compilation : le second catch est inaccessible", "Le second catch est exécuté pour les fichiers introuvables", "Les deux catch sont exécutés"],
  bonne: 1,
  explication: "FileNotFoundException est une sous-classe d'Exception : le premier catch l'attrape toujours. Il faut mettre le catch le plus spécifique en premier." },

{ id: "c3-throw-qcm", ch: "ch3", niveau: 1, type: "qcm", titre: "throw ou throws ?",
  consigne: "Lequel est correct ?",
  options: ["public void f() throw MonException { throws new MonException(); }", "public void f() throws MonException { throw new MonException(); }", "public void f() throws new MonException { ... }", "public void f() { throws MonException; }"],
  bonne: 1,
  explication: "throws (avec s) dans la signature avec le nom de la classe ; throw (sans s) dans le corps avec un objet créé par new." },

{ id: "c3-checked-qcm", ch: "ch3", niveau: 2, type: "multi", titre: "Exceptions vérifiées",
  consigne: "Cochez les exceptions que le compilateur OBLIGE à attraper ou à déclarer avec throws.",
  options: ["IOException", "FileNotFoundException", "Une classe MonException extends Exception", "NullPointerException", "ArithmeticException", "ArrayIndexOutOfBoundsException"],
  bonnes: [0, 1, 2],
  explication: "Les sous-classes d'Exception (hors RuntimeException) sont vérifiées. NullPointerException, ArithmeticException, ArrayIndexOutOfBounds… héritent de RuntimeException : non vérifiées." },

{ id: "c3-personne", ch: "ch3", niveau: 2, type: "sortie", titre: "Contrôler l'âge à la création",
  code: R`class AgeException extends Exception {
    public AgeException(int a) { super("age invalide " + a); }
}
class Personne {
    private int age;
    public Personne(int age) throws AgeException {
        if (age < 0 || age > 130) throw new AgeException(age);
        this.age = age;
        System.out.println("cree " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        int[] ages = {20, -3, 130, 131};
        int ok = 0;
        for (int a : ages) {
            try {
                new Personne(a);
                ok++;
            } catch (AgeException e) {
                System.out.println(e.getMessage());
            }
        }
        System.out.println(ok);
    }
}`,
  reponse: "cree 20\nage invalide -3\ncree 130\nage invalide 131\n2",
  explication: "130 est accepté (borne incluse). Pour -3 et 131, l'exception interrompt le constructeur : ok++ n'est pas exécuté. Le try est dans la boucle, donc on continue avec la valeur suivante.", wrap: "file" },

/* ======================= CHAPITRE 4 ======================= */
{ id: "c4-comparator", ch: "ch4", niveau: 1, type: "trous", titre: "Comparator par salaire (TP3 §2.1)",
  code: R`import java.util.Comparator;
import java.util.TreeSet;

class ComparateurSalaire «implements» Comparator<«Employee»> {
    @Override
    public int «compare»(Employee e1, Employee e2) {
        return Double.compare(e1.getSalaire(), e2.«getSalaire()»);
    }
}

public class Main {
    public static void main(String[] args) {
        TreeSet<Employee> employes = new TreeSet<>(«new ComparateurSalaire()»);
        employes.add(new Employee("Martin", "Lea", 2500));
        for (Employee e : employes) {
            System.out.println(e.getNom());
        }
    }
}`,
  avant: R`class Employee {
    private String nom, prenom; private double salaire;
    public Employee(String n, String p, double s) { nom = n; prenom = p; salaire = s; }
    public String getNom() { return nom; }
    public double getSalaire() { return salaire; }
}`,
  explication: "Le TreeSet range ses éléments selon compare : négatif = avant, 0 = égal, positif = après. Double.compare(a, b) fait exactement ça pour deux double. Le Comparator est une classe séparée : on peut en écrire plusieurs (par nom, par salaire) sans modifier Employee.", wrap: "file" },

{ id: "c4-treeset-piege", ch: "ch4", niveau: 3, type: "sortie", titre: "Le piège du TreeSet",
  code: R`import java.util.*;

class Employee {
    private String nom; private double salaire;
    public Employee(String n, double s) { nom = n; salaire = s; }
    public String getNom() { return nom; }
    public double getSalaire() { return salaire; }
}
class ParSalaire implements Comparator<Employee> {
    public int compare(Employee a, Employee b) {
        return Double.compare(a.getSalaire(), b.getSalaire());
    }
}

public class Main {
    public static void main(String[] args) {
        TreeSet<Employee> set = new TreeSet<>(new ParSalaire());
        set.add(new Employee("Martin", 2500));
        set.add(new Employee("Durand", 1800));
        set.add(new Employee("Petit", 2500));
        set.add(new Employee("Roux", 3200));
        System.out.println(set.size());
        for (Employee e : set) {
            System.out.println(e.getNom());
        }
    }
}`,
  reponse: "3\nDurand\nMartin\nRoux",
  explication: "Petit a le même salaire que Martin : compare renvoie 0, le TreeSet le considère comme un doublon et ne l'ajoute pas (add renvoie false). Les autres sont triés par salaire croissant. Correction possible : en cas d'égalité de salaire, comparer ensuite les noms.", wrap: "file" },

{ id: "c4-intervalle", ch: "ch4", niveau: 1, type: "trous", titre: "Employés dans un intervalle de salaire",
  code: R`public ArrayList<Employee> entre(double min, double max) {
    ArrayList<Employee> res = new ArrayList<>();
    for (Employee e : «employes») {
        if (e.getSalaire() «>=» min «&&» e.getSalaire() «<=» max) {
            res.add(e);
        }
    }
    return res;
}`,
  avant: R`import java.util.*;
class Employee { public double getSalaire() { return 0; } }
class Entreprise {
    private TreeSet<Employee> employes;`,
  apres: "}",
  explication: "2000 <= salaire <= 3000 s'écrit en Java avec deux comparaisons reliées par && (on ne peut pas écrire 2000 <= s <= 3000).", wrap: "class" },

{ id: "c4-arraylist", ch: "ch4", niveau: 1, type: "sortie", titre: "Opérations sur ArrayList",
  code: R`ArrayList<String> l = new ArrayList<>();
l.add("A");
l.add("B");
l.add("C");
l.add(1, "X");
l.remove("C");
System.out.println(l);
System.out.println(l.size() + " " + l.get(1) + " " + l.contains("C"));
l.set(0, "Z");
System.out.println(l.indexOf("B") + " " + l);`,
  reponse: "[A, X, B]\n3 X false\n2 [Z, X, B]",
  explication: "add(1, \"X\") insère à l'indice 1 et décale la suite. remove(\"C\") retire l'objet \"C\". println d'une liste affiche [e1, e2, …]. set remplace sans décaler.", wrap: "main" },

{ id: "c4-remove-int", ch: "ch4", niveau: 3, type: "sortie", titre: "remove(int) ou remove(Object) ?",
  code: R`ArrayList<Integer> n = new ArrayList<>();
n.add(10);
n.add(20);
n.add(30);
n.remove(1);
System.out.println(n);
n.remove(Integer.valueOf(10));
System.out.println(n);`,
  reponse: "[10, 30]\n[30]",
  explication: "remove(1) avec un int supprime l'élément à l'INDICE 1 (c'est 20). Pour supprimer la valeur 10, il faut passer un objet Integer : remove(Integer.valueOf(10)).", wrap: "main" },

{ id: "c4-set", ch: "ch4", niveau: 2, type: "sortie", titre: "Inscrits sans doublon (TP2 §2 D)",
  code: R`Set<String> inscrits = new TreeSet<>();
String[][] cours = { {"Lea", "Tom"}, {"Tom", "Ana"}, {"Lea"} };
for (String[] c : cours) {
    for (String nom : c) {
        inscrits.add(nom);
    }
}
System.out.println(inscrits.size() + " " + inscrits);
System.out.println(inscrits.add("Ana"));`,
  reponse: "3 [Ana, Lea, Tom]\nfalse",
  explication: "Un Set refuse les doublons : Lea et Tom ne sont gardés qu'une fois. TreeSet trie (ordre alphabétique pour des String). add renvoie false si l'élément était déjà présent.", wrap: "main" },

{ id: "c4-iterator", ch: "ch4", niveau: 2, type: "sortie", titre: "Supprimer avec un Iterator",
  code: R`ArrayList<Integer> l = new ArrayList<>();
for (int i = 1; i <= 6; i++) {
    l.add(i * 3);
}
Iterator<Integer> it = l.iterator();
while (it.hasNext()) {
    int v = it.next();
    if (v % 2 == 0) {
        it.remove();
    }
}
System.out.println(l);`,
  reponse: "[3, 9, 15]",
  explication: "La liste vaut [3, 6, 9, 12, 15, 18]. it.remove() supprime le dernier élément renvoyé par next() : on retire les pairs. C'est la seule façon sûre de supprimer pendant un parcours.", wrap: "main" },

{ id: "c4-map", ch: "ch4", niveau: 2, type: "sortie", titre: "Compter avec une Map",
  code: R`String[] mots = {"java", "swing", "java", "file", "java"};
Map<String, Integer> compte = new TreeMap<>();
for (String m : mots) {
    compte.put(m, compte.getOrDefault(m, 0) + 1);
}
System.out.println(compte);
System.out.println(compte.get("java") + " " + compte.get("xml") + " " + compte.containsKey("file"));`,
  reponse: "{file=1, java=3, swing=1}\n3 null true",
  explication: "put remplace la valeur si la clé existe déjà. getOrDefault évite le null de la première fois. Un TreeMap est trié par clé et s'affiche {cle=valeur, …}. get d'une clé absente renvoie null.", wrap: "main" },

{ id: "c4-poly-eval", ch: "ch4", niveau: 2, type: "trous", titre: "Polynôme : calculer P(x) (TP3 §2.2)",
  code: R`public class Polynome {
    private Map<Integer, Monome> monomes = new TreeMap<>();   // degré -> monôme

    public double calculerValeur(double x) {
        double somme = «0»;
        for (Monome m : monomes.«values()») {
            somme += m.getCoef() * Math.«pow»(x, m.getDegre());
        }
        return somme;
    }
}`,
  avant: R`import java.util.*;
class Monome {
    private double coef; private int degre;
    public double getCoef() { return coef; }
    public int getDegre() { return degre; }
}`,
  explication: "Un polynôme est composé de monômes (composition). values() donne les monômes de la Map. Math.pow(x, n) = x puissance n. P(2) = 3×4 + 5×2 − 2 = 20.", wrap: "class" },

{ id: "c4-poly-add", ch: "ch4", niveau: 3, type: "trous", titre: "Polynôme : regrouper les degrés",
  consigne: "ajouter(m) ajoute un monôme au polynôme en le fusionnant avec celui de même degré.",
  code: R`public void ajouter(Monome m) {
    int d = m.getDegre();
    if (monomes.«containsKey»(d)) {
        double c = monomes.«get»(d).getCoef() + m.getCoef();
        monomes.«put»(d, new Monome(c, d));
    } else {
        monomes.put(d, m);
    }
}

public Polynome additionner(Polynome q) {
    Polynome res = new Polynome();
    for (Monome m : this.monomes.values()) res.ajouter(m);
    for (Monome m : «q».monomes.values()) res.ajouter(m);
    return res;
}`,
  avant: R`import java.util.*;
class Monome {
    private double coef; private int degre;
    public Monome(double c, int d) { coef = c; degre = d; }
    public double getCoef() { return coef; }
    public int getDegre() { return degre; }
}
class Polynome {
    private Map<Integer, Monome> monomes = new TreeMap<>();`,
  apres: "}",
  explication: "La Map indexée par le degré permet de retrouver directement le monôme de même degré (réponse à la question de conception du TP) : 3x² + 2x² = 5x².", wrap: "class" },

{ id: "c4-poly-mult", ch: "ch4", niveau: 3, type: "sortie", titre: "Produit de deux polynômes",
  code: R`public class Main {
    public static void main(String[] args) {
        // P(x) = 2x + 3   et   Q(x) = x + 4   (clé = degré, valeur = coefficient)
        Map<Integer, Double> p = new TreeMap<>();
        p.put(1, 2.0); p.put(0, 3.0);
        Map<Integer, Double> q = new TreeMap<>();
        q.put(1, 1.0); q.put(0, 4.0);

        Map<Integer, Double> r = new TreeMap<>();
        for (int dp : p.keySet()) {
            for (int dq : q.keySet()) {
                int d = dp + dq;
                double c = p.get(dp) * q.get(dq);
                r.put(d, r.getOrDefault(d, 0.0) + c);
            }
        }
        System.out.println(r);
    }
}`,
  reponse: "{0=12.0, 1=11.0, 2=2.0}",
  explication: "Chaque monôme de P multiplie chaque monôme de Q : les degrés s'additionnent, les coefficients se multiplient. 2x·x = 2x², 2x·4 = 8x, 3·x = 3x, 3·4 = 12 → 2x² + 11x + 12. Le TreeMap affiche les clés dans l'ordre croissant.", wrap: "file", imports: "import java.util.*;" },

{ id: "c4-comparator-qcm", ch: "ch4", niveau: 1, type: "qcm", titre: "Pourquoi un Comparator ?",
  consigne: "Pourquoi faut-il fournir un Comparator<Employee> au TreeSet<Employee> ?",
  options: ["Pour que le TreeSet sache dans quel ordre ranger des objets qu'il ne sait pas comparer seul", "Pour accélérer l'ajout", "Pour autoriser les doublons", "Parce qu'un TreeSet ne peut contenir que des String"],
  bonne: 0,
  explication: "Le TreeSet est trié : il doit comparer les éléments. Employee n'a pas d'ordre « naturel » : on le fournit dans une classe séparée, et on peut en avoir plusieurs (par salaire, par nom…)." },

{ id: "c4-generique", ch: "ch4", niveau: 2, type: "trous", titre: "Classe générique Pair<T> (cours 4)",
  code: R`class Pair<«T»> {
    private T first, second;

    public Pair(T a, T b) {
        first = a;
        second = b;
    }
    public «T» getFirst() { return first; }
}

public class Main {
    public static void main(String[] args) {
        Pair<«Integer»> deuxEntiers = new Pair<>(3, -7);
        Pair<String> deuxMots = new Pair<>("Incroyable", "Hulk");
        System.out.println(deuxEntiers.getFirst() + deuxMots.getFirst());
    }
}`,
  explication: "T est un paramètre de type remplacé à l'utilisation. On ne peut pas écrire Pair<int> : il faut la classe enveloppe Integer (autoboxing de 3 et −7).", wrap: "file" },

{ id: "c4-wrapper", ch: "ch4", niveau: 1, type: "sortie", titre: "Classes enveloppes et conversions",
  code: R`Integer b = Integer.valueOf("20");
int a = b.intValue() + 1;
String s = Integer.toString(567) + 1;
double d = Double.parseDouble("2.5") * 2;
System.out.println(a);
System.out.println(s);
System.out.println(d);
System.out.println(Integer.parseInt("12") + Integer.parseInt("3"));
System.out.println("12" + "3");`,
  reponse: "21\n5671\n5.0\n15\n123",
  explication: "valueOf/parseInt convertissent une chaîne en nombre. Integer.toString(567) + 1 est une concaténation de chaînes (\"5671\"). \"12\" + \"3\" concatène, alors que la somme de deux parseInt additionne.", wrap: "main" },

/* ======================= CHAPITRE 5 : SWING ======================= */
{ id: "c5-fenetre", ch: "ch5", niveau: 1, type: "trous", titre: "La JFrame type du TP4",
  code: R`import javax.swing.*;

public class SimpleWindow «extends» JFrame {
    public SimpleWindow() {
        super();
        build();
    }

    private void build() {
        «setTitle»("Ma premiere fenetre");
        setSize(500, 500);
        setLocationRelativeTo(«null»);   // centre la fenetre
        setDefaultCloseOperation(JFrame.«EXIT_ON_CLOSE»);
    }

    public static void main(String[] args) {
        SwingUtilities.«invokeLater»(new Runnable() {
            public void run() {
                SimpleWindow w = new SimpleWindow();
                w.«setVisible»(true);
            }
        });
    }
}`,
  explication: "La fenêtre hérite de JFrame. setLocationRelativeTo(null) la centre à l'écran. EXIT_ON_CLOSE arrête le programme à la fermeture. invokeLater lance l'interface dans le thread graphique. Sans setVisible(true), rien n'apparaît.", wrap: "file" },

{ id: "c5-listener", ch: "ch5", niveau: 2, type: "trous", titre: "Boutons et ActionListener",
  code: R`import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

public class Fenetre extends JFrame «implements» ActionListener {
    private JButton butt1, butt2;
    private JLabel label;

    public Fenetre() {
        JPanel panel = new JPanel();
        panel.setLayout(new «FlowLayout»());
        butt1 = new JButton("Bouton 1");
        butt1.«addActionListener»(this);
        panel.add(butt1);
        butt2 = new JButton("Bouton 2");
        butt2.addActionListener(this);
        panel.«add»(butt2);
        label = new JLabel("Rien");
        panel.add(label);
        setContentPane(panel);
    }

    @Override
    public void «actionPerformed»(ActionEvent e) {
        Object source = e.«getSource()»;
        if (source «==» butt1) label.setText("clic sur 1");
        else label.«setText»("clic sur 2");
    }
}`,
  explication: "La fenêtre implémente ActionListener, s'enregistre comme écouteur de chaque bouton avec addActionListener(this), et identifie le bouton cliqué par e.getSource(). Ici == est correct : on veut savoir si c'est le même objet bouton.", wrap: "file" },

{ id: "c5-calc", ch: "ch5", niveau: 3, type: "trous", titre: "Calculatrice : réagir au clic",
  code: R`@Override
public void actionPerformed(ActionEvent e) {
    double a = Double.«parseDouble»(champA.«getText()»);
    double b = Double.parseDouble(champB.getText());
    Object src = e.getSource();
    if (src == boutonPlus) {
        resultat.«setText»("" + (a + b));
    } else if (src == boutonDiv) {
        if (b == 0) {
            JOptionPane.«showMessageDialog»(this, "Division par zero !");
        } else {
            resultat.setText("" + (a / b));
        }
    }
}`,
  avant: R`import java.awt.event.*;
import javax.swing.*;
class Calculatrice extends JFrame implements ActionListener {
    private JTextField champA = new JTextField(), champB = new JTextField();
    private JLabel resultat = new JLabel();
    private JButton boutonPlus = new JButton("+"), boutonDiv = new JButton("/");`,
  apres: "}",
  explication: "getText() d'un JTextField renvoie une String → Double.parseDouble pour calculer. setText attend une String : \"\" + nombre convertit. JOptionPane.showMessageDialog affiche un message.", wrap: "class" },

{ id: "c5-layout-qcm", ch: "ch5", niveau: 1, type: "qcm", titre: "Quel layout pour une calculatrice ?",
  consigne: "On veut les 16 boutons d'une calculatrice en 4 lignes × 4 colonnes, tous de la même taille.",
  options: ["FlowLayout", "BorderLayout", "GridLayout(4, 4)", "CardLayout"],
  bonne: 2,
  explication: "GridLayout place les composants dans une grille et leur donne la même taille. FlowLayout = à la suite (défaut d'un JPanel) ; BorderLayout = 5 zones ; CardLayout = couches superposées." },

{ id: "c5-layouts-multi", ch: "ch5", niveau: 2, type: "multi", titre: "Vrai sur les layouts",
  consigne: "Cochez les affirmations vraies.",
  options: ["FlowLayout est le layout par défaut d'un JPanel", "BorderLayout a 5 zones : NORTH, SOUTH, EAST, WEST, CENTER", "Le positionnement absolu en x, y est conseillé dans le TP", "CardLayout n'affiche qu'une couche à la fois", "GridBagLayout est le plus simple à utiliser"],
  bonnes: [0, 1, 3],
  explication: "Le positionnement absolu est déconseillé (pas redimensionnable, pénible à modifier). GridBagLayout est le plus puissant mais le plus complexe." },

{ id: "c5-visible-qcm", ch: "ch5", niveau: 1, type: "qcm", titre: "Fenêtre invisible",
  consigne: "On exécute `JWindow window = new JWindow(); window.setSize(300, 200);` et rien n'apparaît. Pourquoi ?",
  options: ["Il manque setVisible(true)", "Une JWindow ne peut jamais s'afficher", "Il faut setTitle", "La taille est trop petite"],
  bonne: 0,
  explication: "new ne fait qu'instancier l'objet en mémoire. L'affichage demande window.setVisible(true)." },

{ id: "c5-fenetres-qcm", ch: "ch5", niveau: 1, type: "qcm", titre: "JWindow, JDialog, JFrame",
  consigne: "Quelle fenêtre peut être MODALE (bloquer une autre fenêtre tant qu'elle est ouverte) ?",
  options: ["JWindow", "JDialog", "JFrame", "JPanel"],
  bonne: 1,
  explication: "JDialog = boîte de dialogue, éventuellement modale. JFrame = fenêtre principale, jamais modale. JWindow = conteneur nu (splash screen). JPanel n'est pas une fenêtre." },

{ id: "c5-action", ch: "ch5", niveau: 2, type: "trous", titre: "Une action séparée : AbstractAction",
  code: R`import java.awt.event.ActionEvent;
import javax.swing.*;

class EffacerAction «extends» AbstractAction {
    private Calculatrice fenetre;

    public EffacerAction(Calculatrice f, String texte) {
        «super»(texte);
        fenetre = f;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        fenetre.getResultat().setText("");
    }
}

class Calculatrice extends JFrame {
    private JLabel resultat = new JLabel("0");
    public JLabel getResultat() { return resultat; }

    public Calculatrice() {
        JPanel panel = new JPanel();
        JButton effacer = new JButton(«new EffacerAction(this, "C")»);
        panel.add(effacer);
        panel.add(resultat);
        setContentPane(panel);
    }
}`,
  explication: "super(texte) donne son texte au bouton. L'action reçoit la fenêtre (this) pour pouvoir modifier ses composants via un getter. Le JButton est construit directement à partir de l'action.", wrap: "file" },

{ id: "c5-clic-qcm", ch: "ch5", niveau: 2, type: "qcm", titre: "Lecture : que se passe-t-il au clic ?",
  consigne: "butt1 = new JButton(\"First\");  butt1.addActionListener(this);\nbutt2 = new JButton(\"Second\");  // pas d'addActionListener\n\npublic void actionPerformed(ActionEvent e) {\n    if (e.getSource() == butt1) System.out.println(\"bouton 1\");\n    else System.out.println(\"bouton 2\");\n}\n\nL'utilisateur clique sur « Second ». Qu'est-ce qui s'affiche ?",
  options: ["bouton 2", "bouton 1", "Rien du tout", "Une exception"],
  bonne: 2,
  explication: "Un composant sans écouteur génère bien un événement mais personne ne le reçoit : actionPerformed n'est pas appelée. (Cas 1 du TP : « ne pas être perçu ».)" },

{ id: "c5-combo", ch: "ch5", niveau: 2, type: "trous", titre: "JComboBox : transférer la sélection",
  code: R`public class ComboAction extends AbstractAction {
    private SimpleWindowWithComboBox window;

    public ComboAction(SimpleWindowWithComboBox w, String t) {
        super(t);
        window = w;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        Object selected = window.getList().«getSelectedItem»();
        window.getLabel().setText(selected.«toString()»);
    }
}`,
  avant: R`import java.awt.event.ActionEvent;
import javax.swing.*;
class SimpleWindowWithComboBox extends JFrame {
    private JComboBox<String> list = new JComboBox<>(new String[]{"Dog", "Cat"});
    private JLabel label = new JLabel();
    public JComboBox<String> getList() { return list; }
    public JLabel getLabel() { return label; }
}`,
  explication: "getSelectedItem() renvoie un Object : on le convertit en texte avec toString() pour le JLabel.", wrap: "class" },

{ id: "c5-tp-bug-qcm", ch: "ch5", niveau: 3, type: "qcm", titre: "Lecture attentive du code du TP4",
  consigne: "Dans le code du TP4 (listes modifiables) on trouve :\n\nJButton butt3 = new JButton(new Delete(this, \"Delete\"));\nJButton butt4 = new JButton(new Delete(this, \"Remove\"));\n\nLa classe Remove (qui vide la 2e liste) existe. Que fait un clic sur le bouton « Remove » ?",
  options: ["Il vide toute la deuxième liste", "Il supprime seulement l'élément sélectionné (action Delete)", "Rien", "Erreur de compilation"],
  bonne: 1,
  explication: "Le texte affiché vient du paramètre, mais le comportement vient de la classe instanciée : c'est un Delete. Il faudrait new Remove(this, \"Remove\"). Typique d'une question « lire le code » : se fier au code, pas aux noms." },

{ id: "c5-model-qcm", ch: "ch5", niveau: 3, type: "qcm", titre: "Modèle de liste : fireIntervalAdded",
  consigne: "Dans le TP4, ModifiableStringModel (hérite de DefaultComboBoxModel) fait :\n\npublic void addString(String aString) {\n    getStrings().add(aString);\n    int size = getStrings().size();\n    fireIntervalAdded(this, size, size);\n}\n\nÀ quoi sert l'appel à fireIntervalAdded ?",
  options: ["À ajouter l'élément dans l'ArrayList", "À prévenir la JComboBox que les données ont changé pour qu'elle mette son affichage à jour", "À trier la liste", "À vider la liste"],
  bonne: 1,
  explication: "Séparation modèle / vue : le modèle stocke les données (ici une ArrayList<String>), la JComboBox les affiche. Après une modification, le modèle doit « tirer » un événement (fireIntervalAdded / fireIntervalRemoved) pour que la vue se rafraîchisse." },

{ id: "c5-optionpane-qcm", ch: "ch5", niveau: 2, type: "qcm", titre: "JOptionPane",
  consigne: "res = Double.parseDouble(JOptionPane.showInputDialog(null, \"entrez un nombre\"));\nPourquoi faut-il Double.parseDouble ?",
  options: ["showInputDialog renvoie une String", "showInputDialog renvoie un int", "Pour afficher la boîte", "Ce n'est pas nécessaire"],
  bonne: 0,
  explication: "showInputDialog renvoie le texte saisi (String). showConfirmDialog renvoie un int (YES_OPTION, NO_OPTION…), showMessageDialog ne renvoie rien." },

{ id: "c5-menu", ch: "ch5", niveau: 2, type: "trous", titre: "Barre de menu",
  code: R`private void buildMenu() {
    JMenuBar menuBar = new «JMenuBar»();
    JMenu aide = new «JMenu»("?");
    JMenuItem item = new JMenuItem(new InformationAction(this, "Information"));
    aide.add(«item»);
    menuBar.add(«aide»);
    «setJMenuBar»(menuBar);
}`,
  avant: R`import java.awt.event.ActionEvent;
import javax.swing.*;
class InformationAction extends AbstractAction {
    private JFrame w;
    public InformationAction(JFrame w, String s) { super(s); this.w = w; }
    public void actionPerformed(ActionEvent e) { JOptionPane.showMessageDialog(w, "Demo"); }
}
class F extends JFrame {`,
  apres: "}",
  explication: "Hiérarchie : JMenuBar → JMenu → JMenuItem. La barre s'installe avec setJMenuBar, pas avec add.", wrap: "class" },

/* ======================= CHAPITRE 6 : FICHIERS ======================= */
{ id: "c6-ecrire", ch: "ch6", niveau: 1, type: "trous", titre: "Écrire dans un fichier (TP5 §1.4)",
  code: R`public void writeToFile(String fileName, String content) {
    try {
        FileWriter myWriter = new «FileWriter»(fileName);
        myWriter.«write»(content);
        myWriter.«close»();
        System.out.println("Ecriture reussie");
    } catch («IOException» e) {
        System.out.println("Erreur");
        e.printStackTrace();
    }
}`,
  avant: R`import java.io.*;
class Fichiers {`,
  apres: "}",
  explication: "File ne sait pas écrire : on utilise FileWriter. close() libère le fichier et vide le tampon. Les opérations d'entrée/sortie peuvent lever IOException (vérifiée).", wrap: "class" },

{ id: "c6-lire", ch: "ch6", niveau: 1, type: "trous", titre: "Lire un fichier ligne par ligne (TP5 §1.5)",
  code: R`public void readFromFile(String fileName) {
    File myObj = new File(fileName);
    try {
        Scanner myReader = new «Scanner»(myObj);
        while (myReader.«hasNextLine»()) {
            String data = myReader.«nextLine»();
            System.out.println(data);
        }
        myReader.close();
    } catch («FileNotFoundException» e) {
        System.out.println("Fichier introuvable");
    }
}`,
  avant: R`import java.io.*;
import java.util.Scanner;
class Fichiers {`,
  apres: "}",
  explication: "Le même Scanner que pour le clavier, construit avec un File. hasNextLine teste s'il reste une ligne. Si le fichier n'existe pas : FileNotFoundException.", wrap: "class" },

{ id: "c6-notes", ch: "ch6", niveau: 2, type: "sortie", titre: "Écrire puis relire des notes (TP5)",
  code: R`import java.io.*;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws IOException {
        FileWriter w = new FileWriter("notes.txt");
        w.write("Dupont Jean 12 16 11\n");
        w.write("Martin Lea 18 14\n");
        w.close();

        Scanner sc = new Scanner(new File("notes.txt"));
        int n = 0;
        while (sc.hasNextLine()) {
            String[] t = sc.nextLine().split(" ");
            double s = 0;
            for (int i = 2; i < t.length; i++) {
                s += Double.parseDouble(t[i]);
            }
            System.out.println(t[0] + " : " + s / (t.length - 2));
            n++;
        }
        sc.close();
        System.out.println(n + " etudiants");
    }
}`,
  reponse: "Dupont : 13.0\nMartin : 16.0\n2 etudiants",
  explication: "split(\" \") découpe la ligne : t[0] nom, t[1] prénom, notes à partir de t[2]. Nombre de notes = t.length − 2. Dupont : 39/3 = 13.0. Martin : 32/2 = 16.0.", wrap: "file" },

{ id: "c6-file-qcm", ch: "ch6", niveau: 1, type: "qcm", titre: "new File crée-t-il le fichier ?",
  consigne: "Après `File f = new File(\"data.txt\");`, le fichier data.txt (qui n'existait pas) est-il créé sur le disque ?",
  options: ["Oui", "Non : il faut appeler f.createNewFile()", "Seulement si on fait f.exists()", "Oui mais vide et en lecture seule"],
  bonne: 1,
  explication: "L'objet File représente juste un chemin. createNewFile() crée réellement le fichier : true s'il a été créé, false s'il existait déjà (et peut lever IOException)." },

{ id: "c6-append-qcm", ch: "ch6", niveau: 2, type: "qcm", titre: "Écraser ou ajouter ?",
  consigne: "notes.txt contient déjà une ligne. On exécute `FileWriter w = new FileWriter(\"notes.txt\"); w.write(\"Martin Lea 18\\n\"); w.close();`. Que contient le fichier ?",
  options: ["Les deux lignes", "Uniquement « Martin Lea 18 »", "Rien : il faut flush()", "Une erreur car le fichier existe"],
  bonne: 1,
  explication: "new FileWriter(nom) écrase le contenu. Pour ajouter à la fin : new FileWriter(nom, true)." },

{ id: "c6-close-qcm", ch: "ch6", niveau: 2, type: "qcm", titre: "Oubli de close()",
  consigne: "On écrit avec un FileWriter mais on oublie close() à la fin du programme. Risque principal ?",
  options: ["Aucun", "Le texte peut ne jamais être écrit (resté dans le tampon) et le fichier reste ouvert", "Le fichier est supprimé", "Erreur de compilation"],
  bonne: 1,
  explication: "close() vide le tampon vers le disque et libère la ressource : à toujours faire (le TP le précise)." },

{ id: "c6-fileinfo", ch: "ch6", niveau: 1, type: "trous", titre: "Infos sur un fichier (TP5 §1.3)",
  code: R`public void printFileInfos(String s) {
    File myObj = new File(s);
    if (myObj.«exists»()) {
        System.out.println("Nom : " + myObj.«getName»());
        System.out.println("Chemin : " + myObj.«getAbsolutePath»());
        System.out.println("Taille : " + myObj.«length»() + " octets");
    } else {
        System.out.println("Le fichier n'existe pas.");
    }
}`,
  avant: R`import java.io.File;
class Fichiers {`,
  apres: "}",
  explication: "Méthodes de File : exists, getName, getAbsolutePath, length (taille en octets), canRead, canWrite, delete…", wrap: "class" },

{ id: "c6-chooser", ch: "ch6", niveau: 2, type: "trous", titre: "Choisir un fichier : JFileChooser",
  code: R`JFileChooser chooser = new JFileChooser();
int r = chooser.«showOpenDialog»(this);
if (r == JFileChooser.«APPROVE_OPTION») {
    File f = chooser.«getSelectedFile»();
    System.out.println("Ouverture de " + f.getName());
} else {
    System.out.println("Annule par l'utilisateur");
}`,
  avant: R`import java.io.File;
import javax.swing.*;
class F extends JFrame {
    void ouvrir() {`,
  apres: "}}",
  explication: "showOpenDialog affiche la boîte et renvoie un int : APPROVE_OPTION si l'utilisateur valide. Dans la version du TP5 (chooser ajouté à la fenêtre), on teste e.getActionCommand().equals(\"ApproveSelection\").", wrap: "class" },

/* ======================= CHAPITRE 7 : DESSIN ======================= */
{ id: "c7-surface", ch: "ch7", niveau: 1, type: "trous", titre: "Une surface de dessin (TP6 §1)",
  code: R`import java.awt.*;
import javax.swing.*;

class Surface «extends» JPanel {
    private void doDrawing(Graphics g) {
        Graphics2D g2d = («Graphics2D») g;
        g2d.drawLine(30, 30, 200, 30);
    }

    @Override
    public void «paintComponent»(Graphics g) {
        «super».paintComponent(g);
        doDrawing(g);
    }
}

public class DrawLines extends JFrame {
    public DrawLines() {
        «add»(new Surface());
        setSize(350, 250);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}`,
  explication: "On redéfinit paintComponent d'un JPanel. super.paintComponent(g) d'abord (le fond est repeint correctement), puis cast en Graphics2D pour avoir toutes les méthodes. La surface est ajoutée à la JFrame.", wrap: "file" },

{ id: "c7-lignes-qcm", ch: "ch7", niveau: 2, type: "qcm", titre: "Lecture : quelle figure ?",
  consigne: "g2d.drawLine(30, 30, 200, 30);\ng2d.drawLine(200, 30, 30, 200);\ng2d.drawLine(30, 200, 200, 200);\ng2d.drawLine(200, 200, 30, 30);\n\nQuelle figure obtient-on ? (rappel : y vers le bas)",
  options: ["Un carré", "Un sablier : deux horizontales (haut et bas) reliées par deux diagonales qui se croisent", "Un triangle", "Une croix seule"],
  bonne: 1,
  explication: "Haut (30,30)→(200,30), diagonale vers le bas-gauche, bas (30,200)→(200,200), diagonale vers le haut-gauche. Les deux diagonales se croisent au centre : forme de sablier (ou de « Z » fermé)." },

{ id: "c7-repere-qcm", ch: "ch7", niveau: 1, type: "qcm", titre: "Le repère",
  consigne: "Où se trouve le point (0, 0) d'un JPanel, et dans quel sens va y ?",
  options: ["En bas à gauche, y vers le haut", "En haut à gauche, y vers le bas", "Au centre", "En haut à droite, y vers le bas"],
  bonne: 1,
  explication: "Repère écran : origine en haut à gauche, x vers la droite, y vers le bas." },

{ id: "c7-rect-qcm", ch: "ch7", niveau: 1, type: "qcm", titre: "fillRect",
  consigne: "Que dessine g2d.fillRect(30, 20, 50, 80) ?",
  options: ["Un rectangle plein de coin haut-gauche (30, 20), large de 50 et haut de 80", "Un rectangle de (30, 20) à (50, 80)", "Un contour de rectangle", "Un cercle de rayon 50"],
  bonne: 0,
  explication: "x, y = coin haut-gauche ; puis largeur, hauteur. fill = plein, draw = contour. Le coin opposé est en (80, 100)." },

{ id: "c7-boucle", ch: "ch7", niveau: 2, type: "sortie", titre: "Calculer les positions dessinées",
  consigne: "Au lieu de dessiner, on affiche les paramètres qui seraient passés à drawRect.",
  code: R`int x = 20;
for (int i = 0; i < 4; i++) {
    int taille = 30 + i * 10;
    System.out.println("drawRect(" + x + ", 50, " + taille + ", " + taille + ")");
    x = x + taille + 5;
}`,
  reponse: "drawRect(20, 50, 30, 30)\ndrawRect(55, 50, 40, 40)\ndrawRect(100, 50, 50, 50)\ndrawRect(155, 50, 60, 60)",
  explication: "Des carrés de plus en plus grands, alignés en haut à y = 50, espacés de 5 pixels : x suivant = x + taille + 5 (20 → 55 → 100 → 155).", wrap: "main" },

{ id: "c7-formes", ch: "ch7", niveau: 2, type: "trous", titre: "Formes, couleur, texte",
  code: R`private void doDrawing(Graphics g) {
    Graphics2D g2d = (Graphics2D) g;
    g2d.setPaint(new «Color»(150, 150, 150));
    g2d.«fillOval»(270, 130, 50, 50);          // un disque de diametre 50
    g2d.fill(new Ellipse2D.«Double»(10, 100, 80, 100));
    g2d.setFont(new Font("Serif", Font.«BOLD», 20));
    g2d.«drawString»("Bonjour", 20, 30);
}`,
  avant: R`import java.awt.*;
import java.awt.geom.Ellipse2D;
class S extends javax.swing.JPanel {`,
  apres: "}",
  explication: "Color(r, g, b) avec des valeurs 0-255. fillOval avec largeur = hauteur → cercle plein. Ellipse2D.Double est une forme passée à fill. Font(nom, style, taille) avec Font.PLAIN / BOLD / ITALIC. drawString(texte, x, y).", wrap: "class" },

{ id: "c7-image", ch: "ch7", niveau: 2, type: "trous", titre: "Afficher une image (TP6 §3)",
  code: R`class ImageSurface extends JPanel {
    private Image logo;

    public ImageSurface() {
        logo = new «ImageIcon»("logo_utbm.png").getImage();
        Dimension d = new Dimension();
        d.width = logo.«getWidth»(null);
        d.height = logo.getHeight(null);
        setPreferredSize(d);
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
        g2d.«drawImage»(logo, 0, 0, null);
    }
}`,
  imports: "import java.awt.*;\nimport javax.swing.*;",
  explication: "ImageIcon charge le fichier, getImage() renvoie l'Image. La taille préférée du panneau = taille de l'image ; la JFrame utilise ensuite pack() pour s'y ajuster.", wrap: "class" },

{ id: "c7-repaint-qcm", ch: "ch7", niveau: 2, type: "qcm", titre: "Redessiner",
  consigne: "Les données d'un dessin changent (un point s'est déplacé). Que faut-il appeler pour mettre l'affichage à jour ?",
  options: ["paintComponent(g) directement", "repaint()", "setVisible(true)", "new Surface()"],
  bonne: 1,
  explication: "On n'appelle jamais paintComponent soi-même (on n'a pas le bon Graphics) : repaint() demande à Swing de redessiner, qui appellera paintComponent." },

/* ======================= CHAPITRE 8 : DIJKSTRA ======================= */
{ id: "c8-graphe", ch: "ch8", niveau: 1, type: "trous", titre: "Structure de graphe (TP7)",
  code: R`public class Graphe {
    private Map<String, Map<String, Integer>> voisins = new HashMap<>();

    public void ajouterArete(String a, String b, int poids) {
        voisins.putIfAbsent(a, new HashMap<>());
        voisins.putIfAbsent(b, new HashMap<>());
        voisins.«get»(a).put(b, poids);
        voisins.get(«b»).put(«a», poids);   // graphe non oriente
    }

    public int distanceDirecte(String a, String b) {
        return voisins.get(a).«get»(b);
    }
}`,
  imports: "import java.util.*;",
  explication: "Liste d'adjacence : ville → (voisine → distance). Une route se parcourt dans les deux sens, donc on l'enregistre de a vers b ET de b vers a.", wrap: "class" },

{ id: "c8-dijkstra", ch: "ch8", niveau: 3, type: "trous", titre: "Implémenter l'algorithme (TP7)",
  code: R`public Map<String, Integer> dijkstra(String depart) {
    Map<String, Integer> dist = new HashMap<>();
    Set<String> visites = new HashSet<>();
    for (String n : voisins.keySet()) {
        dist.put(n, Integer.«MAX_VALUE»);       // infini
    }
    dist.put(depart, «0»);

    while (visites.size() < voisins.size()) {
        // a. le noeud non visite le plus proche
        String m = null;
        for (String n : voisins.keySet()) {
            if (!visites.«contains»(n) && (m == null || dist.get(n) «<» dist.get(m))) {
                m = n;
            }
        }
        if (dist.get(m) == Integer.MAX_VALUE) break;   // reste inaccessible

        for (Map.Entry<String, Integer> e : voisins.get(m).entrySet()) {
            String x = e.getKey();
            int nouvelle = dist.get(m) + e.«getValue»();
            if (nouvelle < dist.get(x)) {
                dist.«put»(x, nouvelle);
            }
        }
        visites.«add»(m);   // b. marquer m comme visite
    }
    return dist;
}`,
  avant: R`import java.util.*;
class Graphe {
    private Map<String, Map<String, Integer>> voisins = new HashMap<>();`,
  apres: "}",
  explication: "C'est exactement l'algorithme du TP : initialisation (0 pour le départ, infini ailleurs), choix du non-visité le plus proche, relâchement des voisins (si d(m) + poids < d(x), on remplace), marquage. Le break évite MAX_VALUE + poids qui déborderait en négatif.", wrap: "class" },

{ id: "c8-trace", ch: "ch8", niveau: 2, type: "sortie", titre: "Faire tourner Dijkstra à la main",
  consigne: "Arêtes (non orientées) : A-B 4, A-C 2, C-B 1, B-D 5, C-D 8, D-E 3, C-E 10. Départ A. Le programme affiche le nœud choisi à chaque étape puis les distances finales.",
  code: R`import java.util.*;

public class Main {
    static Map<String, Map<String, Integer>> g = new TreeMap<>();

    static void arete(String a, String b, int p) {
        g.putIfAbsent(a, new TreeMap<>());
        g.putIfAbsent(b, new TreeMap<>());
        g.get(a).put(b, p);
        g.get(b).put(a, p);
    }

    public static void main(String[] args) {
        arete("A", "B", 4); arete("A", "C", 2); arete("C", "B", 1);
        arete("B", "D", 5); arete("C", "D", 8); arete("D", "E", 3); arete("C", "E", 10);

        Map<String, Integer> dist = new TreeMap<>();
        for (String n : g.keySet()) dist.put(n, Integer.MAX_VALUE);
        dist.put("A", 0);
        Set<String> vus = new HashSet<>();
        String ordre = "";
        while (vus.size() < g.size()) {
            String m = null;
            for (String n : g.keySet())
                if (!vus.contains(n) && (m == null || dist.get(n) < dist.get(m))) m = n;
            for (String x : g.get(m).keySet()) {
                int nd = dist.get(m) + g.get(m).get(x);
                if (nd < dist.get(x)) dist.put(x, nd);
            }
            vus.add(m);
            ordre += m;
        }
        System.out.println(ordre);
        System.out.println(dist);
    }
}`,
  reponse: "ACBDE\n{A=0, B=3, C=2, D=8, E=11}",
  explication: "Étape 1 : A (0) → C=2, B=4. Étape 2 : C (2) → B = min(4, 2+1) = 3, D = 10, E = 12. Étape 3 : B (3) → D = min(10, 3+5) = 8. Étape 4 : D (8) → E = min(12, 8+3) = 11. Étape 5 : E. Le chemin direct A-B (4) est battu par A-C-B (3).", wrap: "file" },

{ id: "c8-ordre-qcm", ch: "ch8", niveau: 2, type: "qcm", titre: "Quel nœud ensuite ?",
  consigne: "Après avoir visité A, les distances provisoires sont : B = 7, C = 3, D = ∞, E = 9. Quel nœud est visité ensuite ?",
  options: ["B, car il est le premier dans l'ordre alphabétique", "C, car il a la plus petite distance parmi les non visités", "E", "D"],
  bonne: 1,
  explication: "Règle (a) de l'algorithme : on prend toujours le nœud non visité de plus petite distance provisoire." },

{ id: "c8-negatif-qcm", ch: "ch8", niveau: 3, type: "qcm", titre: "Limites de l'algorithme",
  consigne: "Cochez l'affirmation vraie.",
  options: ["L'algorithme fonctionne avec des distances négatives", "Une fois un nœud marqué visité, sa distance ne change plus", "Il faut visiter les nœuds dans l'ordre alphabétique", "Integer.MAX_VALUE + 5 donne un très grand nombre positif"],
  bonne: 1,
  explication: "Avec des poids positifs, quand on visite le nœud le plus proche, sa distance est définitive. Avec des poids négatifs, ce n'est plus vrai. MAX_VALUE + 5 déborde et devient négatif." },

{ id: "c8-fichier", ch: "ch8", niveau: 2, type: "trous", titre: "Charger le graphe depuis un fichier",
  consigne: "Chaque ligne du fichier : « Belfort Sevenans 7 ».",
  code: R`public static Graphe charger(String nomFichier) throws FileNotFoundException {
    Graphe g = new Graphe();
    Scanner sc = new Scanner(new «File»(nomFichier));
    while (sc.hasNextLine()) {
        String[] t = sc.nextLine().«split»(" ");
        g.ajouterArete(t[0], t[1], Integer.«parseInt»(t[«2»]));
    }
    sc.close();
    return g;
}`,
  avant: R`import java.io.*;
import java.util.*;
class Graphe { public void ajouterArete(String a, String b, int p) { } }
class Main {`,
  apres: "}",
  explication: "Combine TP5 et TP7 : Scanner sur un File, split pour découper, parseInt pour convertir la distance (3e mot, indice 2).", wrap: "class" }
];

/* Fonctions et notions qui reviennent le plus (classement fait à partir des 7 TP) */
window.PATTERNS = [
  { n: "Constructeur + this + getters/setters", ou: "Tous les TP", code: R`public Employee(String nom, double salaire) {
    this.nom = nom;
    this.salaire = salaire;
}
public double getSalaire() { return salaire; }` },
  { n: "super(...) dans le constructeur d'une sous-classe", ou: "TP2, TP3, TP4 (super() de JFrame)", code: R`public Vendeur(String nom, String prenom, double fixe) {
    super(nom, prenom);
    this.fixe = fixe;
}` },
  { n: "Méthode abstraite + redéfinition (@Override) + polymorphisme", ou: "TP2 (paye, prix de location)", code: R`public abstract double calculerPaye();      // dans Salarie
@Override public double calculerPaye() { ... } // dans chaque sous-classe
for (Salarie s : liste) total += s.calculerPaye();` },
  { n: "Parcourir une collection et filtrer dans un résultat", ou: "TP2 (véhicules), TP3 (employés), TP2 (inscrits)", code: R`ArrayList<Vehicule> res = new ArrayList<>();
for (Vehicule v : parc) {
    if (v.getCouleur().equals(couleur)) res.add(v);
}
return res;` },
  { n: "equals pour comparer des String (jamais ==)", ou: "TP1, TP2 (recherche par titre), TP5", code: R`if (m.getTitre().equals(titre)) return m;` },
  { n: "toString() redéfini (+ super.toString())", ou: "TP2", code: R`@Override
public String toString() { return super.toString() + "\nVolume : " + volume; }` },
  { n: "instanceof + cast", ou: "TP2 (volume utile, affichage par catégorie)", code: R`if (p instanceof Etudiant) { Etudiant e = (Etudiant) p; ... }` },
  { n: "throw / throws / try-catch, exception personnalisée", ou: "TP3, TP5 (IOException)", code: R`class AgeException extends Exception {
    public AgeException(String m) { super(m); }
}
if (age < 0) throw new AgeException("age negatif");
try { ... } catch (AgeException e) { System.out.println(e.getMessage()); }` },
  { n: "Comparator + TreeSet / Map", ou: "TP3 (employés, polynômes), TP7 (graphe)", code: R`public int compare(Employee a, Employee b) {
    return Double.compare(a.getSalaire(), b.getSalaire());
}` },
  { n: "Scanner : nextInt / nextLine / hasNextLine", ou: "TP1 (clavier), TP3 (saisie), TP5 et TP7 (fichiers)", code: R`while (sc.hasNextLine()) {
    String[] t = sc.nextLine().split(" ");
}` },
  { n: "Fenêtre Swing : extends JFrame, build(), setVisible(true)", ou: "TP4, TP5, TP6", code: R`setTitle("..."); setSize(500, 500);
setLocationRelativeTo(null);
setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);` },
  { n: "Événement : addActionListener(this) + actionPerformed + getSource", ou: "TP4 (calculatrice), TP5 (JFileChooser)", code: R`bouton.addActionListener(this);
public void actionPerformed(ActionEvent e) { if (e.getSource() == bouton) ... }` },
  { n: "paintComponent + super.paintComponent + Graphics2D", ou: "TP6", code: R`public void paintComponent(Graphics g) {
    super.paintComponent(g);
    Graphics2D g2d = (Graphics2D) g;
}` },
  { n: "Conversions String → nombre", ou: "TP3, TP4 (JTextField, JOptionPane), TP5, TP7", code: R`double d = Double.parseDouble(champ.getText());
int n = Integer.parseInt(t[2]);` }
];
