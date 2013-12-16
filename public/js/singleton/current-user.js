define(['models/user','backbone.iobind'],function(User,backbone_iobind){
    var CurrentUser = User.extend({
        initialize: function(){
            User.prototype.initialize.apply(this, arguments);
            _.bindAll(this,'serverCreate');
            this.ioBind('create', this.serverCreate, this);
        },
        serverCreate : function(data){
            if(data._id){
                this.set(data);
            }            
        }
    });
    return new CurrentUser();
});