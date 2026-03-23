function datasta() {

// recuperation des valeurs de X  
   const inputx = document.getElementById('valeursx').value;
   let valeursx= inputx.split(' ');
   let nombresx = valeursx.map(valeurx => 
      parseFloat(valeurx.trim())).filter(nombrex => !isNaN(nombrex));

// recuperation des valeurs de Y
   const inputy = document.getElementById('valeursy').value;
   let valeursy = inputy.split(' ');
   let nombresy = valeursy.map(valeury => 
      parseFloat(valeury.trim())).filter(nombrey => !isNaN(nombrey));
   
      // calcul de la moyenne de X
      let sommex = nombresx.reduce((acc, nombrex) => acc + nombrex, 0);
      const moyennex = sommex/nombresx.length;
      
      // calcul de la variance de X    
      let carresx = nombresx.map(nombrex => nombrex * nombrex);
      let scarresx = carresx.reduce((acc, carrex) => acc + carrex, 0);
      const dcarresx = scarresx/nombresx.length;
      const varx = dcarresx - moyennex * moyennex;      
      
      // calcul de la moyenne de Y 
      let sommey = nombresy.reduce((acc, nombrey) => acc + nombrey,0);
      const moyenney = sommey/nombresy.length;
      
      // calcul de la variance de Y      
      let carresy = nombresy.map(nombrey => nombrey * nombrey);
      let scarresy = carresy.reduce((acc, carrey) => acc + carrey, 0);
      const dcarresy = scarresy/nombresy.length;
      let vary = dcarresy - moyenney * moyenney;
      
      // calcul de la covariance      
      const xy = nombresx + ',' + nombresy;
      let nxy = xy.split(',').map(Number);
      let spxy = 0;
      for (var i = 0, c = nxy.length / 2; i < c; i++) {
         spxy += nxy[i] * nxy[i + c];
      }
      const cov = 2 * spxy / nxy.length - moyennex * moyenney;
      
      // calcul du coefficient de correlation
      const r = cov / Math.sqrt(varx * vary);   
      
      //commentaire
      if (Math.abs(r) >= 0 && Math.abs(r) < 0.1) {
         document.getElementById('commentaire').innerHTML = '<p>' +
         '7-)Commentaire : <br> |r| ≈ 0, ' +
         'alors il y a une indépendance linéaire entre les variables X et Y. ' +
         'Les résultats obtenus sont laches.</p>';
      }
      else if (Math.abs(r) >= 0.1 && Math.abs(r) < 0.87) {
         document.getElementById('commentaire').innerHTML = '<p>' + 
         '7-)Commentaire : <br> |r| < 0.87, ' +
         'alors il y a une faible corrélation entre les variables X et Y. ' +
         'Les résultats obtenus ne sont pas fiables.</p>';
      }
      else if (Math.abs(r) >= 0.87 && Math.abs(r) < 0.99) {
         document.getElementById('commentaire').innerHTML = '<p>' + 
         '7-)Commentaire : <br> 0.87 ≤ |r| < 0.99, ' +
         'alors il y a une forte corrélation entre les variables X et Y. ' +
         'Les résultats obtenus sont fiables.</p>';
      }
      else if (Math.abs(r) >= 0.99 && Math.abs(r) <= 1) {
         document.getElementById('commentaire').innerHTML = '<p>' + 
         '7-)Commentaire : <br> |r| ≈ 1, ' +
         'alors il y a une corrélation linéaire parfaite entre les variables X et Y. ' +
         'Les résultats obtenus sont très fiables.</p>';
      }

      const bordure = document.querySelectorAll('.bord');
      const commentaire = document.querySelector('.commentaire');
      bordure.forEach((bord) => {
      bord.classList.add('active');
      commentaire.classList.add('active');
     });

      // stockage des résultats      
      // moyennes
      const introduction = document.getElementById('introduction');
      introduction.innerHTML = '<p> Pour résoudre ce problème de ' + 
      'statistique à deux variables, déterminons les caractéristiques marginales de chaque variable.</p>'
      

      document.getElementById('moyenne').innerText = '1-) Calcul de la moyenne de X : ' + '\n' + 'M(X) = '+ moyennex.toFixed(4).replace(/\.0+$/, '') + '\n\n' +
      '2-) Calcul de la moyenne de Y : ' + '\n' + 'M(Y) = ' + moyenney.toFixed(4).replace(/\.0+$/, '') ;
   
      // variances     
      document.getElementById('variance').innerHTML = '<p> 3-) Calcul de la Variance de X : ' + '<br> V(X) = ' + varx.toFixed(4).replace(/\.0+$/, '') + 
     '<br><br>4-) Calcul de la Variance de Y : <br> V(Y) = ' + vary.toFixed(4).replace(/\.0+$/, '') ;   

      // covariance
      document.getElementById('covariance').innerHTML = '<p>5-) Calcul de la Covariance de XY : <br> Cov(XY) = ' + cov.toFixed(4).replace(/\.0+$/, '') + '</p>';

      // coefficient de correlation
      document.getElementById('correlation').innerHTML = '<p>6-) Calcul du Coefficient de corrélation : <br> r = ' + r.toFixed(4).replace(/\.0+$/, '') + '</p>';     
}

//vérification de la validité des valeurs entrées

function verification() {
      const entrex = document.getElementById('valeursx').value;
      let valx= entrex.split(' ');
      let nbrx = valx.map(valeurx => 
      parseFloat(valeurx.trim())).filter(nombrex => !isNaN(nombrex));

   // recuperation des valeurs de Y
      const entrey = document.getElementById('valeursy').value;
      let valy = entrey.split(' ');
      let nbry = valy.map(valeury => 
      parseFloat(valeury.trim())).filter(nombrey => !isNaN(nombrey));
      const lx = nbrx.length;
      const ly = nbry.length
      if (lx == 0 && ly == 0) {
         alert("Aucune valeur saisie");
      } 
      else if (lx == ly) {
         datasta();
      } 
      else {
         alert("Vous avez oublié certaines valeurs de X ou de Y");
         
      }
   }

   // affichage des résultats


   document.getElementById('envoyer').addEventListener('click', verification);

/* input.split() permet de découper la chaine de caractères stockés dans
input en des éléments de tableau séparés par des espaces. map() permet de convertir 
chaque élément du tableau input en un nombre grace à parseFloatpuis les stocke dans 
le nouveau tableau nombres. trim() supprime les espaces blancs et filter() suprimes
les valeurs qui ne sont pas des nombres (isNaN) */