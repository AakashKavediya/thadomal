"use client"

const SecurityFeatures = () => {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Neural Intelligence Box */}
          <div className="relative bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <div className="absolute inset-x-0 -top-0.5 h-1 rounded-t-2xl bg-gradient-to-r from-purple-500 to-indigo-500" />
            <h2 className="text-2xl font-bold text-white mb-4">Neural Intelligence</h2>
            <p className="text-gray-300 mb-4">
              Our AI agents don't just detect threats, they collaborate to predict them. With multiple self-hosted neural agents, 
              we identify and anticipate attack patterns before they arise.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Distributed predictive analysis</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Multi-agent pattern recognition</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Autonomy self-learning systems</span>
              </li>
            </ul>
          </div>
          
          {/* Real-Time Protection Box */}
          <div className="relative bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <div className="absolute inset-x-0 -top-0.5 h-1 rounded-t-2xl bg-gradient-to-r from-purple-500 to-indigo-500" />
            <h2 className="text-2xl font-bold text-white mb-4">Real-Time Protection</h2>
            <p className="text-gray-300 mb-4">
              Millisecond response times ensure threats are neutralized the moment they're detected. 
              Our systems never sleep, never pause.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Instant response</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Continuous monitoring</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Zero downtime</span>
              </li>
            </ul>
          </div>
          
          {/* Global Scale Box */}
          <div className="relative bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
            <div className="absolute inset-x-0 -top-0.5 h-1 rounded-t-2xl bg-gradient-to-r from-purple-500 to-indigo-500" />
            <h2 className="text-2xl font-bold text-white mb-4">Global Scale</h2>
            <p className="text-gray-300 mb-4">
              Protecting organizations worldwide with a unified security intelligence network 
              that grows stronger with every connection.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Worldwide coverage</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Shared intelligence</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-200">Collective protection</span>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    );
  };
  
  export default SecurityFeatures;