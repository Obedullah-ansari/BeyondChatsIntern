const DetailsPanel = () => {
    return (
      <div className="p-4 ">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Customer Details</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">R</span>
              </div>
              <div>
                <p className="font-medium">Ruby Williams</p>
                <p className="text-xs text-gray-500">Customer since Jan 2022</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span>ruby.williams@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account:</span>
                <span>Premium</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Today, 10:23 AM</p>
              <p className="text-sm">Changed reservation dates</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Yesterday, 2:45 PM</p>
              <p className="text-sm">Requested room upgrade</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">May 15, 8:12 AM</p>
              <p className="text-sm">Added payment method</p>
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default DetailsPanel;