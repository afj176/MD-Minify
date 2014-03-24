# EXAMPLE README

![alt "Hero"](http://placehold.it/700x400 "Featured Image")

## Production Recommendations

During development I work with multiple CSS files as needed, and multiple JS files for each part of the site or functionality. But when I move to production, I normally put together a build setup that optimizes the code for production.

> Email-style angle brackets
> are used for blockquotes.

> > And, they can be nested.

> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.    

## Optional Helper Shell Script

The `site` file is a helper script that will take care of setting up a new directory for you to start working on your new site. This script will first create the directory then export all the needed files (without the `.git` directory or any `.git*` files) to the new directory. This is the preferred method of utilizing this template framework.

You can use the `site` command via the command line, like this:

    ./site /path/to/new/site

You may need to mark this script as executable before using it:

    chmod +x site

Finally, you can move this file to /usr/bin to use the `site` command from any directory. If you do this, be sure to uncomment the `cd ~/Development...` line and update the path to the location of this git repository on your local computer.

That's some text with a footnote.[^1]

[^1]: And that's the footnote.